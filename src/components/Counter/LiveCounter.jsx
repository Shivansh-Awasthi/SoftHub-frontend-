import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, CalendarDays, CalendarRange } from 'lucide-react';
import { db, ref, set, get } from './firebase';

const STORAGE_KEY = 'visitorRecords';

// Utility functions
const isToday = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

const isYesterday = (timestamp) => {
    const date = new Date(timestamp);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
};

const isWithinPastWeek = (timestamp) => {
    const date = new Date(timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
};

const isWithinPastYear = (timestamp) => {
    const date = new Date(timestamp);
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    return date >= yearAgo;
};

// Firebase interaction functions
const generateUserId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('userId', userId);
    }
    return userId;
};

// Fetch visitor records from Firebase
const fetchVisitorRecords = async () => {
    const visitorRef = ref(db, 'visitorRecords');
    try {
        const snapshot = await get(visitorRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return {}; // Return empty object if no data exists
        }
    } catch (error) {
        console.error("Error fetching visitor records: ", error);
        return {};
    }
};

// Add visitor record to Firebase
const addVisitorRecord = async (userId) => {
    const visitorRef = ref(db, 'visitorRecords/' + userId);
    const timestamp = Date.now();

    try {
        // Check if the user already has a visit today
        const snapshot = await get(visitorRef);
        if (snapshot.exists()) {
            const visits = snapshot.val().visits || [];
            visits.push(timestamp);  // Add a new visit timestamp
            await set(visitorRef, { visits });  // Update Firebase
        } else {
            // First visit of the day, create new record
            await set(visitorRef, { visits: [timestamp] });
        }
    } catch (error) {
        console.error("Error adding visitor record: ", error);
    }
};

// StatCard component
const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-[#1b1a1c] p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-500">{title}</h3>
                <Icon className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{value}</p>
        </div>
    );
};

export const LiveCounter = () => {
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        yesterday: 0,
        pastWeek: 0,
        pastYear: 0,
        todayVisits: 0, // Added field to track today's total visits (including refreshes)
    });

    useEffect(() => {
        const userId = getUserId();

        const fetchData = async () => {
            const records = await fetchVisitorRecords();
            const userVisits = records[userId] ? records[userId].visits || [] : [];

            // Add visitor record for today if not already present
            const hasVisitedToday = userVisits.some(timestamp => isToday(timestamp));
            if (!hasVisitedToday) {
                await addVisitorRecord(userId);
            }

            // Calculate unique visitors for different timeframes
            const uniqueVisitors = new Set(Object.keys(records));
            const todayVisitors = new Set();
            const yesterdayVisitors = new Set();
            const weekVisitors = new Set();
            const yearVisitors = new Set();
            let todayTotalVisits = 0;

            Object.keys(records).forEach(id => {
                const userRecord = records[id];
                const visits = userRecord.visits || [];
                visits.forEach(record => {
                    if (isToday(record)) {
                        todayVisitors.add(id);
                        todayTotalVisits += 1;  // Count each visit (refresh increases count)
                    }
                    if (isYesterday(record)) yesterdayVisitors.add(id);
                    if (isWithinPastWeek(record)) weekVisitors.add(id);
                    if (isWithinPastYear(record)) yearVisitors.add(id);
                });
            });

            setStats({
                total: uniqueVisitors.size,
                today: todayVisitors.size,
                yesterday: yesterdayVisitors.size,
                pastWeek: weekVisitors.size,
                pastYear: yearVisitors.size,
                todayVisits: todayTotalVisits,  // Set today's total visit count
            });
        };

        fetchData();
    }, []);

    return (
        <div className="bg-[#2E2E2E] p-8">
            <div className="mx-auto w-full">
                <div className="flex items-center justify-center mb-8">
                    <Users className="w-8 h-8 text-blue-500 mr-2" />
                    <h1 className="text-3xl font-bold text-blue-600">Visitor Statistics</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    <StatCard
                        title="Today's Visitors"
                        value={stats.today}
                        icon={Clock}
                    />
                    <StatCard
                        title="Yesterday's Visitors"
                        value={stats.yesterday}
                        icon={Calendar}
                    />
                    <StatCard
                        title="Past Week"
                        value={stats.pastWeek}
                        icon={CalendarDays}
                    />
                    <StatCard
                        title="This Year"
                        value={stats.pastYear}
                        icon={CalendarRange}
                    />
                    <StatCard
                        title="Total Visitors"
                        value={stats.total}
                        icon={Users}
                    />
                    <StatCard
                        title="Total Visits (Daily)"
                        value={stats.todayVisits}  // Display total visits for today (including refreshes)
                        icon={Clock}
                    />
                </div>
            </div>
        </div>
    );
};
