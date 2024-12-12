import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, CalendarDays, CalendarRange } from 'lucide-react';

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

// Storage functions
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

const getVisitorRecords = () => {
    const records = localStorage.getItem(STORAGE_KEY);
    return records ? JSON.parse(records) : [];
};

const addVisitorRecord = (userId) => {
    const records = getVisitorRecords();
    records.push({
        timestamp: Date.now(),
        userId,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// StatCard component
const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-black p-6 rounded-lg shadow-md">
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
    });


    useEffect(() => {
        const userId = getUserId();
        const records = getVisitorRecords();

        const hasVisitedToday = records.some(
            record => record.userId === userId && isToday(record.timestamp)
        );

        if (!hasVisitedToday) {
            addVisitorRecord(userId);
        }

        const uniqueVisitors = new Set(records.map(record => record.userId));
        const todayVisitors = new Set(
            records.filter(record => isToday(record.timestamp)).map(record => record.userId)
        );
        const yesterdayVisitors = new Set(
            records.filter(record => isYesterday(record.timestamp)).map(record => record.userId)
        );
        const weekVisitors = new Set(
            records.filter(record => isWithinPastWeek(record.timestamp)).map(record => record.userId)
        );
        const yearVisitors = new Set(
            records.filter(record => isWithinPastYear(record.timestamp)).map(record => record.userId)
        );

        setStats({
            total: uniqueVisitors.size,
            today: todayVisitors.size,
            yesterday: yesterdayVisitors.size,
            pastWeek: weekVisitors.size,
            pastYear: yearVisitors.size,
        });
    }, []);

    return (
        <div className=" bg-[#2E2E2E] p-8">
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
                </div>

                {/* <p className="text-center text-sm text-gray-500 mt-8">
                    Each visitor is counted only once per day
                </p> */}
            </div>
        </div>
    );
};