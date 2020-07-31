
class SubjectsService {

    async listAll() {
        try {
            const response = await axios.get(`${baseUrl}/subjects`);
            return response.data;
        } catch (error) {
            console.error(error);
            return {error: true, massage: 'Error while obtaining subjects'}
        }
    }

    async getById(id) {
        try {
            const response = await axios.get(`${baseUrl}/subjects/${id}`); 
            return response.data;
        } catch (error) {
            console.error(error);
            return {error: true, massage: 'Error while obtaining the subject'}
        }
    }

    async create(subject) {
        try {
            const response = await axios.post(`${baseUrl}/subjects`, subject);
            return response.data;
        } catch (error) {
            console.error(error);
            return {error: true, massage: 'Error while creating a new subject'}
        }
    }

    async update(subject) {
        try {
            const response = await axios.put(`${baseUrl}/subjects/${subject.id}`, subject);
            return response.data;
        } catch (error) {
            console.error(error);
            return {error: true, masssage: 'Error while updating the subject'}
        }
    }

    async delete(subject) {
        try {
            const response = await axios.delete(`${baseUrl}/subjects/${subject.id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return {error: true, massage: 'Error while deleting the subject'}
        }
    }
}

const subjectsService = new SubjectsService();