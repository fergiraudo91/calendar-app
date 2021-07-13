import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendarMessages-spa';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { clearEventActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);
    

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.authReducer)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
       dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    
    const onSelectEvent = (e) => {
        delete e.bgColor;
        dispatch(eventSetActive(e));
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    
    const onSelectorSlot = (e) => {
        dispatch(clearEventActive());
    }
    

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: (uid === event.user._id ) ? '#367CF7' : '#455660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#FFF',

        }

        return {style};
    }

    return (
        <div>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onSelectSlot={onSelectorSlot}
                selectable={true}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
            />

            <AddNewFab/>
            {activeEvent && <DeleteEventFab />}
            <CalendarModal />
        </div>
    )
}
