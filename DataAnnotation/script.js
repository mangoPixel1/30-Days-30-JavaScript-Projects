const events = [
    {
      eventName: "Tech Conference 2024",
      date: "2024-07-20",
      location: {
        venue: "Convention Center",
        city: "New York",
        country: "USA"
      },
      attendees: ["Alice", "Bob", "Charlie"],
      schedule: [
        {
          time: "10:00 AM",
          activity: "Keynote Speech"
        },
        {
          time: "11:00 AM",
          activity: "Panel Discussion"
        }
      ]
    },
    {
      eventName: "Web Development Workshop",
      date: "2024-10-15",
      location: {
        venue: "Tech Hub",
        city: "San Francisco",
        country: "USA"
      },
      attendees: ["David", "Emma", "Frank"],
      schedule: [
        {
          time: "09:00 AM",
          activity: "Introduction to HTML"
        },
        {
          time: "10:30 AM",
          activity: "CSS Best Practices"
        },
        {
          time: "01:00 PM",
          activity: "JavaScript Basics"
        }
      ]
    },
    {
      eventName: "AI & Machine Learning Summit",
      date: "2024-08-10",
      location: {
        venue: "Innovation Hall",
        city: "Boston",
        country: "USA"
      },
      attendees: ["Grace", "Henry", "Isabella"],
      schedule: [
        {
          time: "10:00 AM",
          activity: "Opening Remarks"
        },
        {
          time: "11:00 AM",
          activity: "Machine Learning Algorithms"
        },
        {
          time: "02:00 PM",
          activity: "AI in Healthcare"
        }
      ]
    },
    {
      eventName: "Startup Pitch Event",
      date: "2024-10-05",
      location: {
        venue: "Startup Arena",
        city: "Los Angeles",
        country: "USA"
      },
      attendees: ["Jack", "Katherine", "Liam"],
      schedule: [
        {
          time: "09:00 AM",
          activity: "Welcome and Networking"
        },
        {
          time: "10:00 AM",
          activity: "Pitch Session 1"
        },
        {
          time: "01:00 PM",
          activity: "Pitch Session 2"
        }
      ]
    },
    {
      eventName: "Cybersecurity Conference",
      date: "2024-10-12",
      location: {
        venue: "Security Hall",
        city: "Chicago",
        country: "USA"
      },
      attendees: ["Mia", "Noah", "Olivia"],
      schedule: [
        {
          time: "09:30 AM",
          activity: "Cyber Threats Overview"
        },
        {
          time: "11:00 AM",
          activity: "Protecting Data Privacy"
        },
        {
          time: "02:00 PM",
          activity: "Future of Cybersecurity"
        }
      ]
    }
];

/*const totalAttendees = events.reduce((total, event) => total + event.attendees.length, 0);

const totalAttendees = events.reduce((total, event) => {
    return total + event.attendees.length;
}, 0);
  
console.log(totalAttendees);*/

/*const eventSessions = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const eventYear = eventDate.getFullYear();
    
    return eventMonth === 10 && eventYear === 2024;
  }).map(event => {
    const filteredSchedule = event.schedule.filter(session => {
      const [time, period] = session.time.split(' ');
      const [hours, minutes] = time.split(':');
      const sessionTime = new Date();
      sessionTime.setHours(period === 'PM' ? parseInt(hours) + 12 : parseInt(hours));
      sessionTime.setMinutes(parseInt(minutes));
      
      return sessionTime.getHours() < 12;
    });
    
    return {
      eventName: event.eventName,
      date: event.date,
      schedule: filteredSchedule
    };
  });

eventSessions.forEach(ev => {
    console.log(`name: ${ev.eventName}`);
    console.log(`date: ${ev.date}`);
    console.log(`schedule: ${ev.schedule}`);
});*/

/*const eventSessions = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const eventYear = eventDate.getFullYear();
    
    return eventMonth === 10 && eventYear === 2024;
  }).map(event => {
    const filteredSchedule = event.schedule.filter(session => {
      const [time, period] = session.time.split(' ');
      const [hours, minutes] = time.split(':');
      const sessionTime = new Date();
      sessionTime.setHours(period === 'PM' ? parseInt(hours) + 12 : parseInt(hours));
      sessionTime.setMinutes(parseInt(minutes));
      
      return sessionTime.getHours() < 12;
    });
    
    return {
      eventName: event.eventName,
      date: event.date,
      time: filteredSchedule.map(session => session.time) // Corrected this line
    };
  });*/

const eventSessions = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const eventYear = eventDate.getFullYear();
    
    return eventMonth === 10 && eventYear === 2024;
  }).map(event => {
    const filteredSchedule = event.schedule.filter(session => {
      const [time, period] = session.time.split(' ');
      const [hours, minutes] = time.split(':');
      const sessionHour = parseInt(hours);
      
      return (period === 'AM' && sessionHour < 12) || (period === 'PM' && sessionHour === 12);
    });
    
    return {
      eventName: event.eventName,
      date: event.date,
      time: filteredSchedule.map(session => session.time)
    };
});


eventSessions.forEach(ev => {
    console.log(`name: ${ev.eventName}`);
    console.log(`date: ${ev.date}`);
    console.log(`schedule: ${ev.time}`);
    //console.log(ev);
});