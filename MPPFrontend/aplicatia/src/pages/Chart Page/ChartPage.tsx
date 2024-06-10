import { useContext, useEffect } from 'react';

import { BarChart } from '@mui/x-charts';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../contexts/UserContext';
import { Layout } from '../../shared/components/layout/Layout';

export default function ChartPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    const usersContext = useContext(UsersContext)!;
    const usersList = usersContext.users;

    const ageMap = new Map<number, number>();

    usersList.forEach((currentUser) => {
        if (ageMap.get(currentUser.getAge()) === undefined) ageMap.set(currentUser.getAge(), 1);
        else ageMap.set(currentUser.getAge(), ageMap.get(currentUser.getAge())! + 1);
    });

    console.log(ageMap);

    return (
        <Layout>
            <BarChart
                xAxis={[
                    {
                        id: 'Age',
                        data: [...ageMap.keys()],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [...ageMap.values()],
                    },
                ]}
                width={500}
                height={300}
            />
        </Layout>
    );
}
