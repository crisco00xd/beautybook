import React, { useState, useEffect } from "react";
import {API_BASE_URL} from '../../config';
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionGrid from '@fullcalendar/interaction'
import styles from "../../style.js";
import { Footer, Navbar} from "../../components";
import { getAllAppointments, getServiceById, getAllServices, getStylistAppointment, getSalon, getStylist, getAppointmentById, isOwnerByUserId } from "../../queries.jsx";

function Calendar() {
  const [events, setEvents] = useState([]);

  //displays events
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const stylistId = parseInt(searchParams.get('stylistId'));

        const appointments = await getStylistAppointment(stylistId)
       
        if (appointments.error === "Appointment not found"){
          return;
        }
        
        const formattedAppointments = await Promise.all(
          appointments
            .filter(appointment => appointment.status !== "finished")
            .map(async appointment => {
              const service = await getServiceById(appointment.service);
              return {
                id: appointment.id,
                title: service.serviceName,
                start: new Date(appointment.datetime),
                status: appointment.status,
              }
            })
        );
        setEvents(formattedAppointments);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAppointments();
  }, []);

  //adds events and appointments
  const handleSelect = async (info) => {
    const { start } = info;
    const searchParams = new URLSearchParams(location.search);
    const stylistId = parseInt(searchParams.get('stylistId'))
    const services = await getAllServices()
    const stylist = await getStylist(stylistId)
    const salon = await getSalon(stylist.salonID)

    let promptMessage = 'Select service by typing a number:\n';
      services.forEach((service, index) => {
        promptMessage += `${service.serviceName} (${index + 1}), `;
      });
      promptMessage = promptMessage.slice(0, -2); // Remove trailing comma and space

      const serviceIndex = parseInt(prompt(promptMessage));

      if (isNaN(serviceIndex) || serviceIndex < 1 || serviceIndex > services.length) {
        alert("Please enter a valid service number.");
        return;
      }

    const selectedService = services[serviceIndex - 1];

    const selectedDate = start.toISOString().slice(0, 10);

    const salonStartTime = parseInt(salon.startTime.split(":")[0]);
    const salonCloseTime = parseInt(salon.closeTime.split(":")[0]);

    // Prompt the user for the hour of the event
    const eventHourPrompt = prompt("Enter hour (0-23) for the event");
    const selectedHour = parseInt(eventHourPrompt);
  
    if (!eventHourPrompt || isNaN(eventHourPrompt) || selectedHour < 0 || selectedHour > 23) {
      alert("Please enter a valid hour (0-23).");
      return;
    }

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.toISOString().slice(0, 10);

    if (selectedDate === currentDay && selectedHour <= currentHour) {
      alert("Cannot make an appointment for past hours.");
      return;
    }

    if (selectedHour < salonStartTime || selectedHour >= salonCloseTime) {
      alert("The salon is closed at this hour.");
      return;
    }
    
    try {
      const isEventAlreadyScheduled = events.some((event) => {
        const eventDate = event.start.toISOString().slice(0, 10);
        const eventHour = event.start.getHours();
        const selectedHour = parseInt(eventHourPrompt);
        return eventDate === selectedDate && eventHour === selectedHour;
      });

      if (isEventAlreadyScheduled) {
        alert("There is already an event scheduled for this time.");
        return;
      }

      const eventHour = parseInt(eventHourPrompt);

      // Create the new date with the selected date, hour, and minute
      const newDate = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        eventHour,
      );

      const date = new Date(newDate.getTime() - (newDate.getTimezoneOffset() * 60000)).toISOString().replace(/\.000Z$/, '');

      const data = {
        datetime: date,
        serviceID: selectedService.serviceID,
        stylistID: stylistId,
        status: "pending"
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const appointment = await getAllAppointments()

      const service = await getServiceById(appointment[appointment.length - 1].serviceID)
      
      const newAppointment = {
        id: appointment[appointment.length - 1].appointmentID,
        title: service.serviceName,
        start: newDate,
        status: "pending",
      };
      setEvents([...events, newAppointment]);

    } catch (error) {
      console.error(error);
    }
  };

  function eventContent(eventInfo) {
    const status = eventInfo.event.extendedProps.status;
    let color;
    switch (status) {
      case "accepted":
        color = "green";
        break;
      case "pending":
        color = "orange";
        break;
      default:
        color = "blue";
        break;
    }
    const formattedTime = new Date(eventInfo.event.start).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
      <div className={`fc-content ${eventInfo.isMirror ? 'fc-mirror' : ''}`}>
        <div className="fc-time" style={{  fontWeight: 'bold' }}>{formattedTime}</div>
        <div className="fc-title" style={{ color, fontWeight: 'bold' }}>{eventInfo.event.title}</div>
        <div className={`fc-bg ${color}`}></div>
      </div>
    );
  }

  return (
    <div>

    <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
          <Navbar />
          </div>
    </div>
    </div>

    <div>
      <Fullcalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionGrid]}
      initialView={"dayGridMonth"}
      events={events}
      select={handleSelect}
      selectable={"true"}
      dayMaxEvents={"true"}
      validRange={{ start: new Date() }}
      eventContent={eventContent}
      />
    </div>

    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer/>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Calendar;