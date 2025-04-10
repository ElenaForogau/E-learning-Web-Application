import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return null;
  }
};

export const registerUser = async (registrationData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/register`,
      registrationData
    );
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    return null;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Profile fetch error:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courses:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching course:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const updateCourse = async (courseId, updatedData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/courses/${courseId}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating course:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const addCourse = async (courseData, token) => {
  try {
    const response = await axios.post(`${API_URL}/courses/add`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding course:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const deleteCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting course:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const enrollInCourse = async (courseId, token) => {
  try {
    const userId = sessionStorage.getItem("userId");
    const response = await axios.post(
      `${API_URL}/enrollments/${courseId}/enroll`,
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Enrollment error:", error.response?.data || error.message);
    return null;
  }
};

export const getEnrolledCourses = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/enrollments/my-enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching enrolled courses:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const unenrollFromCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/enrollments/${courseId}/unenroll`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Unenroll error:", error.response?.data || error.message);
    return null;
  }
};
export const getEnrollmentsByCourse = async (courseId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/enrollments/by-course/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching enrollments by course:",
      error.response?.data || error.message
    );
    return null;
  }
};
export const getMonthlyEnrollments = async (courseId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/enrollments/${courseId}/monthly-stats`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching monthly stats:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getEnrollmentsPerCourse = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/enrollments/stats/per-course`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching enrollments per course:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getEnrollmentDatesOnly = async (courseId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/enrollments/dates/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching enrollment dates:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const getAllEnrollmentDates = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/enrollments/all-dates",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all enrollment dates:",
      error.response?.data || error.message
    );
    return [];
  }
};
