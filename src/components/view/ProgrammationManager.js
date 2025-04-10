import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const formatTime = (time) => {
    return time || '';
};

const parseTime = (timeString) => {
    return timeString || '';
};

const daysDifference = (date1, date2) => {
    if (!date1 || !date2) return 0;
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default function ProgrammationManager({ initialProgrammation, onChange }) {
    const [daysData, setDaysData] = useState(() => {
        if (initialProgrammation?.slots?.length > 0 && initialProgrammation.start_date) {
            const grouped = {};
            const startDate = parseDate(initialProgrammation.start_date);
            initialProgrammation.slots.forEach(slot => {
                const slotDate = new Date(startDate);
                slotDate.setDate(startDate.getDate() + slot.days_from_start);
                const day = formatDate(slotDate);
                if (!grouped[day]) {
                    grouped[day] = { date: day, startTime: '', endTime: '' };
                }
                grouped[day].startTime = slot.start_time;
                grouped[day].endTime = slot.end_time;
            });
            return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        return [{ date: formatDate(new Date()), startTime: '', endTime: '' }];
    });

    useEffect(() => {
        if (onChange && daysData.length > 0) {
            const sortedDays = [...daysData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const startDate = sortedDays[0].date;
            const parsedStartDate = parseDate(startDate);
            const slots = sortedDays.map(day => ({
                days_from_start: daysDifference(parsedStartDate, parseDate(day.date)),
                start_time: parseTime(day.startTime),
                end_time: parseTime(day.endTime),
            }));
            onChange({ start_date: startDate, slots });
        }
    }, [daysData, onChange]);

    const handleDayChange = (dayIndex, field, value) => {
        const newDaysData = [...daysData];
        newDaysData[dayIndex][field] = value;
        setDaysData(newDaysData);
    };

    const handleAddDay = () => {
        const lastDateStr = daysData[daysData.length - 1]?.date;
        const lastDate = parseDate(lastDateStr);
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + 1);
        setDaysData([...daysData, { date: formatDate(nextDate), startTime: '', endTime: '' }]);
    };

    const handleRemoveDay = (dayIndex) => {
        if (daysData.length > 1) {
            const newDaysData = daysData.filter((_, index) => index !== dayIndex);
            setDaysData(newDaysData);
        } else {
            alert("Vous devez avoir au moins un jour de programmation.");
        }
    };

    const columnWidth = '150px';

    return (
        <div>
            <h5>Programmation de l'événement</h5>
            <Table responsive striped="columns" style={{ width: 'auto' }}>
                <thead>
                    <tr>
                        <th>
                            <Button variant="secondary" onClick={handleAddDay} className="float-end"><i className="fa-solid fa-plus"></i></Button>
                        </th>
                        {daysData.map((day, index) => (
                            <th key={`day-header-${index}`} style={{ width: columnWidth }}>
                                <div className="d-flex align-items-center">
                                    <Form.Control
                                        type="date"
                                        value={day.date}
                                        onChange={(e) => handleDayChange(index, 'date', e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => handleRemoveDay(index)}
                                        disabled={daysData.length == 1}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Heure{'\u00A0'}de{'\u00A0'}début</th>
                        {daysData.map((day, index) => (
                            <td key={`start-time-cell-${index}`} style={{ width: columnWidth }}>
                                <Form.Control
                                    type="time"
                                    value={day.startTime}
                                    onChange={(e) => handleDayChange(index, 'startTime', e.target.value)}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Heure{'\u00A0'}de{'\u00A0'}fin</th>
                        {daysData.map((day, index) => (
                            <td key={`end-time-cell-${index}`} style={{ width: columnWidth }}>
                                <Form.Control
                                    type="time"
                                    value={day.endTime}
                                    onChange={(e) => handleDayChange(index, 'endTime', e.target.value)}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}