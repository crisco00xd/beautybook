import {API_BASE_URL} from './config';

// Users
export async function createUser(data) {
  try{
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
    }
    return response;
  }
  catch(error){
      console.log(error);
  };
}
// uploadImage.js
export async function uploadImage(file, filename) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);

    const response = await fetch(`${API_BASE_URL}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// updateImage.js
export async function updateImage(file, filename) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);

    const response = await fetch(`${API_BASE_URL}/update-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// getImage.js
export async function getImage(filename) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-image/${filename}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(email, password) {
  const response = await fetch(`${API_BASE_URL}/user/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
  }

  return response;
}

export async function getStylistAppointment(stylistId) {
  const response = await fetch(`${API_BASE_URL}/appointments/stylist/${stylistId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function isOwnerByUserId(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/is-owner`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}


export async function getAppointmentsOfStylistByStatus(stylistId, status) {
  const response = await fetch(`${API_BASE_URL}/stylists/${stylistId}/appointments/status/${status}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function isAuthenticated() {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/user/is-authenticated`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.json();
}


export async function get_all_stylist_by_owner() {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/stylists/owner`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.json();
}


export async function get_all_salon_by_owner() {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/salons/owner`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.json();
}


export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export async function signOut() {
  const accessToken = getAccessToken();
  localStorage.removeItem('access_token');
  
  const response = await fetch(`${API_BASE_URL}/user/sign-out`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  return response;
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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