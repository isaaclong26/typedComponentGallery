import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Event } from "../../";
import { useEloise } from "../../App";
// Create a styled component for the calendar container
const CalendarContainer = styled(Container)`
  padding: 20px;
`;

// Define the localizer to use for the calendar
const localizer = momentLocalizer(moment);

// Define the views to use for the calendar
const views = {
  month: true,
  week: true,
};

export interface CalendarProps {
  Events?: Array<Event>;
  path?: string;
  onNew: (slotInfo: { start: Date; end: Date }) => void;
  onSelect?: (event: Event) => void;
}

// Define the calendar component
const CalendarComponent: React.FC<CalendarProps> = ({
  Events,
  path,
  onSelect,
  onNew,
}) => {
  const { theme, logic } = useEloise();
  const navigate = useNavigate();

  logic.hooks.useAsyncEffect(async () => {
    if (Events) {
      setEvents(Events);
    }
    if (path) {
      let ats = await logic.fb.docs.getUserCollection(path);
      if (ats) {
        setEvents(
          ats.map((x: any) => {
            return {
              data: {
                title: x.data.title,
                start: x.data.date,
                type: x.data.type,
                end: x.data.date,
              },
              id: x.id,
            };
          })
        );
      }
    }
  });

  // Define state for the events data
  const [events, setEvents] = useState<Event[]>();

  // Define function to handle adding new events
  const handleNew = (slotInfo: { start: Date; end: Date }) => {
    onNew(slotInfo);
  };

  // Define function to style the events
  const eventStyleGetter = (event: Event) => {
    return {
      style: {
        backgroundColor: theme.colors[0],
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };
  const handleSelectEvent = (event: Event) => {
    onSelect && onSelect(event);
  };

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        selectable
        onSelectSlot={handleNew}
        defaultView={Views.WEEK}
        style={{ height: "100vh" }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent} // handle event selection
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;
