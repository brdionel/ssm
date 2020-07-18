class CoursesService {
  
  async listAll() {
    try {
      const response = await axios.get(`${baseUrl}/courses`);
      return response.data;
    } catch (error) {
      console.error(error);
      return {error: true, message: 'Error while obtaining courses'}
    }
  }
  
  async getById(id) {
    try {
      const response = await axios.get(`${baseUrl}/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return {error: true, message: 'Error while obtaining the course'}
    }
  }
  
  async create(course) {
    try {
      const response = await axios.post(`${baseUrl}/courses`, course);
      return response.data;
    } catch (error) {
      console.error(error);
      return {error: true, message: 'Error while creating a new course'}
    }
  }
  
  async update(course) {
    try {
      const response = await axios.put(`${baseUrl}/courses/${course.id}`, course);
      return response.data;
    } catch (error) {
      console.error(error);
      return {error: true, message: 'Error while updating the course'}
    }
  }
  
  async delete(course) {
    try {
      const response = await axios.delete(`${baseUrl}/courses/${course.id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return {error: true, message: 'Error while updating the course'}
    }
  }

}

const coursesService = new CoursesService();