'use client';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // added EventClickArg
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end?: Date;
}

const Calendar = (): JSX.Element => {
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
        {
            id: "1",
            title: "Event Now",
            start: new Date()
        }
    ]);

    const handleDateSelect = (arg: { start: Date, end: Date, allDay: boolean, dateStr: string }): void => {
        if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
            const newEvent: CalendarEvent = {
                id: `${calendarEvents.length + 1}`,
                title: "New Event",
                start: arg.start,
                end: arg.end,
            };
            setCalendarEvents(prevState => [...prevState, newEvent]);
        }
    };

    const handleEventClick = (arg: { event: CalendarEvent }): void => {
        if (window.confirm(`Are you sure you want to delete the event '${arg.event.title}'?`)) {
            setCalendarEvents(prevState => prevState.filter(event => event.id !== arg.event.id));
        }
    };

    const renderEventContent = (eventInfo: { timeText: string, event: CalendarEvent }): JSX.Element => {
        return (
            <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        )
    };

    const fullCalendarEvents = calendarEvents.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
    }));

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={false}
            // dateSelect={handleDateSelect}
            events={fullCalendarEvents}
            // eventClick={handleEventClick}
            eventContent={renderEventContent}
        />
    )
};

export default Calendar;
