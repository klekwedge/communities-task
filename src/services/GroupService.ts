import { GetGroupsResponse, GroupType } from "../types";

class GroupService {
    static async getGroups(): Promise<GroupType[]> {
        try {
            // Имитация задержки в 1 секунду
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            });

            const response = await fetch('/groups.json');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData: GetGroupsResponse = await response.json();

            if (responseData.result === 0 || !responseData.data) {
                throw new Error('Ошибка при получении групп: данные отсутствует или неверный результат.');
            }

            return responseData.data;
        } catch (error) {
            console.error('Ошибка при получении групп:', error);
            throw error;
        }
    }
}

export default GroupService;