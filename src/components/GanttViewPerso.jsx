import React, { useCallback, useEffect, useState } from "react";
import GanttTimelineHeader from "./ganttTimelineHeader";
import GanttSidebar from "./ganttSidebar";
import GanttTaskContainer from "./GanttTaskContainer";
// import moment from "moment";

// import { calculateWidthAndMargin } from '../constants/ganttUtils';

import { getProjects } from '../assets/utils/ganttUtils';
import { mergeStyles } from "./gantt";
import AllProjectsLine from "./AllProjectsLine";

import Icon from '../assets/pictos/arrow-left.svg';

const GanttViewPerso = ({ customize, data, displayedUserId }) => {
  const defaultStyles = {
    sidebarProjects: {
      background: '#fff',
      color: '#000',
      border: '1px solid #000',
    },
    taskContainer: {
      background: '#fff',
      color: '#000',
      border: '1px solid #000',
    },
  };

  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
  const [previousTasks, setPreviousTasks] = useState([]);
  const [selectedDropdownId, setSelectedDropdownId] = useState(null);
  // const [timelineWeeks, setTimelineWeeks] = useState([]);

  const getUser = useCallback(() => {
    setUser(data && data.users ? [data.users.find(_user => _user.id === displayedUserId)] : []);
  }, [data]);

  useEffect(() => {
    if (user.length > 0) {
      setProjects(getProjects(user))
    }
  }, [user]);

  useEffect(() => {
    getUser();
    setPreviousTasks([]);
  }, [getUser]);

  const toggleDropdown = (id) => {
    if (selectedDropdownId === id) {
      setSelectedDropdownId(null);
    } else {
      setSelectedDropdownId(id);
    }
  };

  // function excludeAttribute(obj, attributeToExclude) {
  //   const { [attributeToExclude]: excludedAttribute, ...rest } = obj;
  //   return rest;
  // }


  const styles = mergeStyles(defaultStyles, customize);

  return (
    <section className="gantt-container-section">
      <div className="gantt-container-section-timeline">
        <GanttTimelineHeader users={user} styleData={styles} />
      </div>

      <div className="gantt-container-section-sidebar">
        {/* <AllProjectsLine toggled="true" /> */}

        {projects.map((project) => (
          <div
            className="gantt-container-section-sidebar-line"
            key={project.id}
          >
            <GanttSidebar styleData={styles} data={project} selectedDropdownId={selectedDropdownId} toggleDropdown={toggleDropdown} view="project" />

            <GanttTaskContainer users={user} selectedDropdownId={selectedDropdownId} project={project} styleData={styles} previousTasks={previousTasks} />

            {/* <div className="gantt-container-section-sidebar-tasks project" style={defaultStyles.sidebarProjects}>
              <div className="gantt-container-section-sidebar-task">
                <div className="gantt-container-section-sidebar-task-client">
                  <p className="gantt-container-section-sidebar-task-client-name">
                    {project.name}
                  </p>
                </div>
                <div
                  className="gantt-container-section-sidebar-task-icon"
                  onClick={() => toggleDropdown(project.id)}>
                  <img
                    src={Icon}
                    alt={"dropdown-arrow-gantt"}
                    style={{
                      transform:
                        project.id === selectedDropdownId
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </div>
              </div>
              {project.id === selectedDropdownId && (
                <div className="gantt-container-section-sidebar-dropdown-content">
                  {project.users.map((user) => (
                    <div
                      className="gantt-container-section-sidebar-dropdown-content-user"
                      key={user.id}>
                      <div className="gantt-container-section-sidebar-dropdown-content-user-p">
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="gantt-task-container" style={
              selectedDropdownId === project.id ? { flexDirection: 'column', marginTop: '115px' } : { flexDirection: 'row' }
            }>


              {project.tasks.map((task, index) => {
                let { width, left } = calculateTaskStyle(task)
                let marginLeftVar = index !== 0 ? previousTasks[index - 1].widthPercentage : null;
                let regex = /(?<=calc\()\d+(\.\d+)?(?=px\))/
                let finalMargin = selectedDropdownId === project.id ? (parseInt(left.match(regex)) - marginLeftVar) : parseInt(left.match(regex));

                return (
                  <div className="gantt-container-section-main-tasks project" key={task.id}>
                    <div className="gantt-container-section-main-tasks-m">
                      <div
                        className="gantt-container-section-main-tasks-t"
                        style={{ width: width, left: finalMargin }}
                      >
                        <div className="gantt-container-section-main-tasks-t-content" style={defaultStyles.taskContainer}>
                          <p>
                            <span>
                              {moment(task.start).format("DD/MM/YYYY")} -{" "}
                              {moment(task.end).format("DD/MM/YYYY")}
                            </span>
                          </p>
                          <p className="title">
                            {task.name}
                          </p>
                          <p className="description">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {
                      <div
                        className="gantt-container-section-main-tasks-u"
                        key={task.user.id}
                      >
                        {task.id === selectedDropdownId && (
                          <>
                            {task.user.tasks.map((userTask, index) => {
                              const { widthPercentage, taskMarginLeft } =
                                calculateWidthAndMargin(
                                  userTask.start,
                                  userTask.end,
                                  timelineWeeks[0].start,
                                  250
                                );

                              const taskStyle = {
                                width: `${widthPercentage}px`,
                                left: `calc(${taskMarginLeft}px)`,
                              };

                              if (index > 0) {
                                taskStyle.marginLeft = "5px";
                              }

                              return (
                                <div
                                  className="gantt-container-section-main-tasks-t"
                                  key={userTask.id}
                                  style={taskStyle}
                                >

                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    }
                  </div>
                )
              })}
            </div> */}
          </div>
        ))}

      </div>
    </section>
  );
};

export default GanttViewPerso;
