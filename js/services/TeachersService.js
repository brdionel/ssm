class TeachersService {

    async listall(){
        try{
            const response = await axios.get(`${baseUrl}/teachers`);
            return response.data
        }catch(error){
            return {error: true, messsage: 'Error while obtaining teachers' }
        }
    }

    async getById(id){
        try{
            const response = await axios.get(`${baseUrl}/teachers/${id}`);
            return response.data
        }catch(error){
            return {error: true, message: 'Error while obtaining the teacher'}
        }   
    }

    async create(teacher){
        try{
            const response = await axios.post(`${baseUrl}/teachers`, teacher);
            return response.data
        }catch(error){
            return {error: true, message: 'Error while creating the teacher'}
        }
    }

    async update(teacher){
        try{
            const response = await axios.put(`${baseUrl}/teachers/${teacher.id}`, teacher);
            return response.data
        }catch(error){
            return {error: true, message: 'Error while updating the teacher'}
        }
    }

    async delete(teacher){
        try{
            const response = await axios.delete(`${baseUrl}/teachers/${teacher.id}`)
            return response.data
        }catch(error){
            return {error: true, message: 'Error while deleting the teacher' }
        }
    }

}
const teachersService = new TeachersService()