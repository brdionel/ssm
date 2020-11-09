class SchedulesServices {

    async getAll () {
        try{
            const response = await axios(`${baseUrl}/schedules`)
            return response.data;
        } catch (error) {
            return { error: true, message: "No se pudieron obtener los horarios"}
        }
    }
    
    async getById (id) {
        try{
            const response = await axios(`${baseUrl}/schedules/${id}`)
            return response.data;
        } catch (error) {
            return { error: true, message: "No se pudieron obtener los horarios"}
        }
    }  

    async create (schedule) {
        try{
            const response = await axios.post(`${baseUrl}/schedules`, schedule)
            console.log('res del back' + JSON.stringify(response))
            return response.data;
        } catch (error){
            return { error: true, message: "No se pudo crear el horario"}
        }
    }

    async delete(id) {
        try{
            const response = await axios.delete(`${baseUrl}/schedules/${id}`)
            console.log('res del back es: '+ JSON.stringify(response))
            return response.data;
        } catch(error){
            return { error: true, message: "No se pudo eliminar el horario"}
        }
    }

    async update (schedule) {
        try{
            const response = await axios.put(`${baseUrl}/schedules/${schedule.id}`, schedule)
            console.log('res del back' + JSON.stringify(response))
            return response.data;
        } catch (error){
            return { error: true, message: "No se pudo crear el horario"}
        }
    }

    async getWeekDays () {
        try{
            const response= await axios(`${baseUrl}/week-days`);
            return response.data;
        } catch(error){
            return { error: true, message: "No se pudieron obtener los dias"}
        }
    }
}

const schedulesService = new SchedulesServices();