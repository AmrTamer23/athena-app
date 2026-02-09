"use client";

import { MOCK_EMPLOYEE_PROFILE } from '@/mocks/employee';
import {
    ProfileHeader,
    StatsOverview,
    BadgesCard,
    TaskAnalyticsCard,
    PerformanceCard,
    TeamContextCard
} from '@/components/profile';

export default function EmployeeProfilePage({
  params: _params,
}: {
  params: { employeeId: string };
}) {
  void _params;
    const employee = MOCK_EMPLOYEE_PROFILE;

    return (
        <div className="min-h-screen bg-background pb-20">
            <main className="container mx-auto px-4 py-8">
                <ProfileHeader employee={employee} />

                <StatsOverview employee={employee} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                    <div className="lg:col-span-2">
                        <TaskAnalyticsCard analytics={employee.taskAnalytics} />
                    </div>

                    <div>
                        <TeamContextCard team={employee.team} />
                    </div>

                    <div className="lg:col-span-1">
                        <PerformanceCard performance={employee.performance} />
                    </div>

                    <div className="lg:col-span-2">
                        <BadgesCard badges={employee.gamification.badges} />
                    </div>
                </div>
            </main>
        </div>
    );
}
