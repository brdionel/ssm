class StudentsService {
    
    getAll =  async () => {
        try{
            const response = await axios(`${baseUrl}/students`);
            return response.data; 
        } catch(error){
            return { error: true, message: "No se pudieron obtener los estudiantes"}
        }
    }

    getById = async (id) => {
        try{
            const response = await axios(`${baseUrl}/students/${id}`); 
            return response.data;
        } catch(error){
            return { error: true, message: "No se obtuvo el"}
        }
    }
 
    create = async (student) => {
        try{
            const response = await axios.post(`${baseUrl}/students`, student);
            console.log('el response primero del front'+ JSON.stringify(response))
            return response.data;
        } catch(error){
            return { error: true, message: "No se pudo crear el estudiante"}
        }
    }

    delete = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/students/${id}`);
            console.log('el response primero del front'+ JSON.stringify(response))
            return response.data;
        } catch(error){
            return { error: true, message: "No se pudo eliminar el estudiante"}
        }
    }

    update = async (id, student) => {
        try {
            const response = await axios.put(`${baseUrl}/students/${id}`, student)
            return response.data;
        } catch(error){
            return { error: true, message: "No se pudo actualizar el estudiante"}
        }
    }
}

const studentsService = new StudentsService();