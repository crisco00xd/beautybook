import {API_BASE_URL} from './config';

// Users
export async function createUser(data) {
  try{
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  catch(error){
      console.log(error);
  };
}

export async function getUserById(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
}

export async function updateUser(userId, data) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  return response.json();
}

// Appointments
export async function createAppointment(data) {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getAppointmentById(appointmentId) {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`);
  return response.json();
}

export async function getAllAppointments() {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  return response.json();
}

export async function updateAppointment(appointmentId, data) {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteAppointment(appointmentId) {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function updateAppointmentStatus(appointmentId, status) {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
}

export async function getBusyTimes() {
  const response = await fetch(`${API_BASE_URL}/appointments/busy-times`);
  return response.json();
}

// Services
export async function createService(data) {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getServiceById(serviceId) {
  const response = await fetch(`${API_BASE_URL}/services/${serviceId}`);
  return response.json();
}

export async function getAllServices() {
  const response = await fetch(`${API_BASE_URL}/services`);
  return response.json();
}

export async function updateService(serviceId, data) {
  const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
   
  })
  return response.json();
}

// Stylist
export const createStylist = async (data) => {
    const response = await fetch(`${API_BASE_URL}/stylists`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const getStylist = async (stylistId) => {
    const response = await fetch(`${API_BASE_URL}/stylists/${stylistId}`);
    return await response.json();
};

export const getAllStylists = async () => {
    const response = await fetch(`${API_BASE_URL}/stylists`);
    return await response.json();
};

export const updateStylist = async (stylistId, data) => {
    const response = await fetch(`${API_BASE_URL}/stylists/${stylistId}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deleteStylist = async (stylistId) => {
    const response = await fetch(`${API_BASE_URL}/stylists/${stylistId}`, {
        method: 'DELETE',
    });
    return await response.json();
};

// Notification
export const createNotification = async (data) => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const getNotification = async (notificationId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`);
    return await response.json();
};

export const getAllNotifications = async () => {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    return await response.json();
};

export const updateNotification = async (notificationId, data) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deleteNotification = async (notificationId) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
        method: 'DELETE',
    });
    return await response.json();
};

// Salon
export const createSalon = async (data) => {
    const response = await fetch(`${API_BASE_URL}/salons`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const getSalon = async (salonId) => {
    const response = await fetch(`${API_BASE_URL}/salons/${salonId}`);
    return await response.json();
};

export const getAllSalons = async () => {
    const response = await fetch(`${API_BASE_URL}/salons`);
    return await response.json();
};

export const updateSalon = async (salonId, data) => {
    const response = await fetch(`${API_BASE_URL}/salons/${salonId}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deleteSalon = async (salonId) => {
    const response = await fetch(`${API_BASE_URL}/salons/${salonId}`, {
        method: 'DELETE',
    });
    return await response.json();
};
