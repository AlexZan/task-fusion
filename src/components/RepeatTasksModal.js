import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import ThemedDialog from './ThemedDialog';
import useTasks from '../hooks/useTasks';

// Components for table columns
function TaskTitleColumn({ task }) {
    return <div className="theme-text-dark">{task.task}</div>;
}


function RepeatTimeDropdownColumn({ task, setTask }) {
    return (
        <select 
            value={task.repeatTime} 
            onChange={(e) => setTask({ ...task, repeatTime: e.target.value })}
            className="dropdown-theme"
        >
            <option value="1 day">1 Day</option>
            <option value="1 week">1 Week</option>
            <option value="1 month">1 Month</option>
        </select>
    );
}



function RepeatTimeInputColumn({ task, setTask }) {
    return (
        <input 
            className="input-theme" 
            type="text" 
            value={task.repeatTime} 
            onChange={(e) => setTask({ ...task, repeatTime: e.target.value })}
        />
    );
}



// The table component
function RepeatTasksTable({ tasks, setTasks, children }) {
    return tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center">
            {children(task, (newTask) => setTasks(tasks.map(t => t.id === newTask.id ? newTask : t))).map((Child, index) => (
                <React.Fragment key={index}>{Child}</React.Fragment>
            ))}
        </div>
    ));
}



// The modal
export default function RepeatTasksModal({ isOpen, onClose }) {
    const { activeTasks, completedTasks } = useTasks();
    const [tasks, setTasks] = useState([...activeTasks, ...completedTasks]);

    const dailyTasks = tasks.filter(task => task.repeat === "1 day");
    const weeklyTasks = tasks.filter(task => task.repeat === "1 week");
    const monthlyTasks = tasks.filter(task => task.repeat === "1 month");
    const customTasks = tasks.filter(task => task.repeat && !["1 day", "1 week", "1 month"].includes(task.repeat));

    return (
        <ThemedDialog open={isOpen} onClose={onClose} width="max-w-4xl">
            <ThemedDialog.Title className="text-3xl leading-6 font-medium theme-text-dark padding-large">
                Repeat Tasks
            </ThemedDialog.Title>
            <div className="padding-medium text-lg">
                <Tab.Group>
                    <Tab.List className="flex padding-small space-x-1 theme-tab-list-bg border-radius-large">
                        <Tab className="w-full py-2.5 text-sm leading-5 font-medium text-blue-500 border-radius-large ui-selected:bg-gray-600 ui-not-selected:bg-transparent">
                            Day
                        </Tab>
                        <Tab className="w-full py-2.5 text-sm leading-5 font-medium text-blue-500 border-radius-large ui-selected:bg-gray-600 ui-not-selected:bg-transparent">
                            Week
                        </Tab>
                        <Tab className="w-full py-2.5 text-sm leading-5 font-medium text-blue-500 border-radius-large ui-selected:bg-gray-600 ui-not-selected:bg-transparent">
                            Month
                        </Tab>
                        <Tab className="w-full py-2.5 text-sm leading-5 font-medium text-blue-500 border-radius-large ui-selected:bg-gray-600 ui-not-selected:bg-transparent">
                            Custom
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="margin-top-medium">
                        <Tab.Panel>
                            <RepeatTasksTable tasks={dailyTasks} setTasks={setTasks}>
                                {(task, setTask) => [<TaskTitleColumn task={task} />, <RepeatTimeDropdownColumn task={task} setTask={setTask} />]}
                            </RepeatTasksTable>
                        </Tab.Panel>
                        <Tab.Panel>
                            <RepeatTasksTable tasks={weeklyTasks} setTasks={setTasks}>
                                {(task, setTask) => [<TaskTitleColumn task={task} />, <RepeatTimeDropdownColumn task={task} setTask={setTask} />]}
                            </RepeatTasksTable>
                        </Tab.Panel>
                        <Tab.Panel>
                            <RepeatTasksTable tasks={monthlyTasks} setTasks={setTasks}>
                                {(task, setTask) => [<TaskTitleColumn task={task} />, <RepeatTimeDropdownColumn task={task} setTask={setTask} />]}
                            </RepeatTasksTable>
                        </Tab.Panel>
                        <Tab.Panel>
                            <RepeatTasksTable tasks={customTasks} setTasks={setTasks}>
                                {(task, setTask) => [<TaskTitleColumn task={task} />, <RepeatTimeInputColumn task={task} setTask={setTask} />]}
                            </RepeatTasksTable>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <div className="padding-large theme-bg-dark text-right">
                <button onClick={onClose} className="padding-small bg-red-600 text-white border-radius-medium margin-right-medium">Close</button>
            </div>
        </ThemedDialog>
    );
}
