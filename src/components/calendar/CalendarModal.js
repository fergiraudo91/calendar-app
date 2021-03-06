import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { clearEventActive, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
if(process.env.NODE_ENV !== 'test'){
    Modal.setAppElement('#root');
}

const now = moment().minute(0).second(0).add(1, 'hours');
const after = now.clone().add(1, 'hours');

const initObjetc = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar)
    const [titleValid, settitleValid] = useState(true);
    const [formValues, setformValues] = useState(initObjetc);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
       console.log(formValues);
        if(activeEvent){

            setformValues(activeEvent);
        }
        else{
            setformValues(initObjetc);
        }

    }, [activeEvent])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha final debe de ser mayor a la fecha de inicio', 'error')
            return;
        }
        if (title.trim().length < 2) {
            return settitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }
        else{
            dispatch(eventStartAddNew(formValues));
        }
        
        settitleValid(true);
        setformValues(initObjetc);
        closeModal();
    }

    const handleInputChange = ({ target }) => {
        
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = (e) => {
        setformValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setformValues({
            ...formValues,
            end: e
        })
    }

    const closeModal = () => {

        dispatch(uiCloseModal());
        dispatch(clearEventActive());
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {activeEvent ?  'Modificar Evento' : 'Nuevo Evento'}  </h1>
            <hr />
            <form className="container"
                onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={formValues.start._d}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={formValues.end}
                        className="form-control"
                        minDate={formValues.start._d}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
