import { createFileRoute } from '@tanstack/react-router';
import { MOCK_EMPLOYEE_PROFILE } from '@/mocks/employee';
import {
    ProfileHeader,
    StatsOverview,
    BadgesCard,
    TaskAnalyticsCard,
    PerformanceCard,
    TeamContextCard
} from '@/components/profile';

export const Route = createFileRoute('/_main/employees/$employeeId')({
    component: EmployeeProfilePage,
});

function EmployeeProfilePage() {
    // In a real app, we would fetch data based on the employeeId from params
    // const { employeeId } = Route.useParams();
    const employee = MOCK_EMPLOYEE_PROFILE;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <ProfileHeader employee={employee} />

                <StatsOverview employee={employee} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                    {/* Column 1: Task Analytics */}
                    <div className="lg:col-span-2">
                        <TaskAnalyticsCard analytics={employee.taskAnalytics} />
                    </div>

                    {/* Column 2: Team Context */}
                    <div>
                        <TeamContextCard team={employee.team} />
                    </div>

                    {/* Row 2, Col 1: Performance */}
                    <div className="lg:col-span-1">
                        <PerformanceCard performance={employee.performance} />
                    </div>

                    {/* Row 2, Col 2: Badges */}
                    <div className="lg:col-span-2">
                        <BadgesCard badges={employee.gamification.badges} />
                    </div>
                </div>
            </main>
        </div>
    );
}
