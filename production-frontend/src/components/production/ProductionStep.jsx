import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeBusy } from "./ressourceSlice";

const ProductionStep = ({ order, componentList, setComponentList, robots, stations, employees }) => {
    const [step, setStep] = useState();
    const [stationEmp, setStationEmp] = useState()
    const [busyEmp, setBusyEmp] = useState([]);
    const dispatch = useDispatch();
    const initialEmp = [...employees];

    const resetStepSelection = (e, value) => {
        /* eslint-disable-next-line */
        if(value != "Bitte wählen"){
            setStep(value);
            handleSelection(e, "empty", 0)
        } else {
            setStep(null)
            document.getElementById("stationselection").value ="Station auswählen";
            document.getElementById("employeeselection").value ="Mitarbeiter zuordnen";
            setBusyEmp(busyEmp => [])
            ref.current.employees = [...initialEmp]
            componentList = componentList.pop();
        }
        
    }

    let ref = useRef({ robots, stations, employees })

    const handleSelection = (event, type, id) => {
        event.preventDefault();
        let comp;
        switch (type) {
            case "robot":
                /* eslint-disable-next-line */
                comp = robots.find(e => e.id == id);
                break;
            /* eslint-disable-next-line */
            case "station": comp = stations.find(e => e.id == id);
                break;
            case "employee":
                /* eslint-disable-next-line */
                if (!employees.find(emp => emp.id == stationEmp)) {
                    comp = { ...componentList[order - 1], employees: [...componentList[order - 1].employees] };
                    alert("kein Mitarbeiter ausgewählt!")
                } else {
                    /* eslint-disable-next-line */
                    let choosenEmp = employees.find(emp => emp.id == stationEmp)
                    choosenEmp = { ...choosenEmp, onDuty: true }
                    comp = { ...componentList[order - 1], employees: [...componentList[order - 1].employees, choosenEmp] };
                    setBusyEmp([...busyEmp, choosenEmp]);
                    dispatch(setEmployeeBusy(choosenEmp))
                    /* eslint-disable-next-line */
                    ref.current.employees = ref.current.employees.filter(e => e.id != choosenEmp.id);
                    document.getElementById("employee-selection").value = "Mitarbeiter zuordnen";
                }
                break;
            default:
                comp = null;
                break;
        }
    
            let components = [...componentList]
            components[order - 1] = { ...comp, step: order }
            setComponentList(componentList => {
            return components
            })

    }

    const generateClassName = () => {
        return `form-select prodStep${order}`;
    }

    const checkTypeSelection = (t) => {
        switch (t) {
            case "Roboter":
                return (
                    <div className="col-sm-3">
                        <select className={generateClassName()} id="robotSelect" onChange={(e) => handleSelection(e, "robot", e.target.value)}>
                            <option defaultValue selected="selected">Roboter wählen</option>
                            {ref.current.robots?.map((robot, i) => {
                                return (<option key={i} value={robot.id}>{`${robot.name} #${robot.id}`}</option>)
                            }
                            )}
                        </select>
                    </div>
                );
            case "Station":
                return (
                    <div className="col">
                        <div className="col d-flex">
                            <div className="col-5 mb-2 me-4">
                                <select id="stationselection" className={generateClassName()} onChange={(e) => handleSelection(e, "station", e.target.value)} >
                                    <option selected="selected1">Station auswählen</option>
                                    {ref.current.stations?.map((station, i) => <option key={i} value={station.id}>{station.name}</option>)}
                                </select>
                            </div>

                            <div className=" col-5 me-2">
                                <select  id="employeeselection" className={generateClassName()}  onChange={(e) => setStationEmp(e.target.value)} >
                                    <option id="employeeselection" selected="selected2">Mitarbeiter zuordnen</option>
                                    {ref.current.employees?.map((emp, i) => <option key={i} value={emp.id}>{emp.name}</option>)}
                                </select>
                            </div>

                            <i className="bi bi-person-add" style={{ "font-size": "1.5rem" }} onClick={(e) => handleSelection(e, "employee", e.target.value)}></i>



                        </div>
                        <div className=" d-flex">
                            <pre><i style={{ "font-size": "1.1rem" }} className="bi bi-people"></i> </pre>
                            {/* eslint-disable-next-line */}
                            {busyEmp.map(emp => emp == busyEmp[busyEmp.length - 1] ? ` ${emp.name}` : `${emp.name}, `)}
                        </div>
                    </div>
                );
            default:
                return (<div></div>)
        }
    }

    return (
        <div className="row mb-3" >
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Schritt {order}</label>
            <div className="col-sm-3">
                <select className={generateClassName()} aria-label="Default select example" onChange={(e) => resetStepSelection(e, e.target.value)}>
                    <option defaultValue>Bitte wählen</option>
                    <option value="Roboter">Roboter</option>
                    <option value="Station">Station</option>
                </select>
            </div>
            {checkTypeSelection(step)}
        </div>
    )
}

export default ProductionStep;