import {useState} from "react";
import Calendar from 'react-calendar';
import { ImBin } from "react-icons/im";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import "./styles/Task.css"
import 'react-calendar/dist/Calendar.css';


function Task(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(props.name);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [calendarValue, setCalendarValue] = useState(new Date());

    function handleEditName() {
        setIsEditing(true);
        setEditedName(props.name)
    }

    function handleSaveName(event) {
        if (event.key === 'Enter') {
            props.modifyTask(props.id, editedName, props.date);
            setIsEditing(false);
        }
    }

    function handleRemove() {
        props.removeTask(props.id);
    }

    function handleChangeStatus(event) {
        // si la calendarValue de la checkbox == true alors isDone == true
        props.changeStatus(props.id, event.target.checked)
    }

    function handleCalendarVisibility() {
        setIsCalendarVisible(!isCalendarVisible);
    }


    function handleChangeOnCalendarValue(nextValue) {
        setCalendarValue(nextValue);
        props.modifyTask(props.id, props.name, nextValue.toLocaleDateString())
    }

    return (
        <li className={props.isDone ? 'done' : ''}>
            <div className="task-item">
                <input type="checkbox" defaultChecked={props.isDone} onChange={handleChangeStatus}/>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onKeyPress={handleSaveName}
                    />
                ) : (
                    <label>{props.name}</label>
                )}
                <label className="date">{props.date}</label>
                <FaCalendarAlt className="calendar-icon" onClick={handleCalendarVisibility}/>
                <FaEdit className="edit-icon" onClick={handleEditName} />
                {isCalendarVisible && <Calendar onChange={handleChangeOnCalendarValue} onClickDay={handleCalendarVisibility} value={calendarValue} />}
                <ImBin className="bin-icon" onClick={handleRemove}/>
            </div>
        </li>
    );
}

export default Task;