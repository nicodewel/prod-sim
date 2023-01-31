import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeBusy } from "./ressourceSlice";



const ProductionStep = ({ order, addToMap, mapEntry, setMapEntry, robots, stations, employees }) => {

    const [step, setStep] = useState();
    const [stationEmp, setStationEmp] = useState()
    const [busyEmp, setBusyEmp] = useState([]);
    const dispatch = useDispatch();

    const resetStepSelection = (e, value) => {
        setStep(value);
        handleSelection(e, "empty", 0)
    }


    let ref = useRef({ robots, stations, employees })

    useEffect(() => {
        console.log("REF: ", ref.current)
    });



    const handleSelection = (event, type, id) => {
        event.preventDefault();
        let comp;
        let n;
        switch (type) {
            case "robot":
                comp = robots.find(e => e.id == id);
                break;
            case "station": comp = stations.find(e => e.id == id);
                break;
            case "employee":
                if(!employees.find(emp => emp.id == stationEmp)){
                    alert("kein Mitarbeiter ausgewählt!")
                }else{
                    let choosenEmp = employees.find(emp => emp.id == stationEmp)
                    choosenEmp = { ...choosenEmp, onDuty: true }
                    console.log("CHOOSEN: ", choosenEmp)
                    comp = { ...mapEntry.comp, employees: [...mapEntry.comp?.employees, choosenEmp] };
                    setBusyEmp([...busyEmp, choosenEmp]);
                    dispatch(setEmployeeBusy(choosenEmp))
                    ref.current.employees = ref.current.employees.filter(e => e.id != choosenEmp.id);
                    document.getElementById("employee-selection").value= "Mitarbeiter zuordnen";
                    break;

                }
              
            case "empty":
                comp = null;
                break;
        }
        console.log({ order: order, comp: comp })
        setMapEntry(mapEntry => {
            mapEntry.order = order
            mapEntry.comp = { ...comp, onDuty: true }
            return mapEntry
        })
        addToMap(mapEntry)
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
                                return (<option key={i} value={robot.id}>{robot.name}</option>)
                            }
                            )}
                        </select>
                    </div>
                );
            case "Station":
                return (

                    <div className="col-sm-3">
                        <div className="col">
                            <select className={generateClassName()} onChange={(e) => handleSelection(e, "station", e.target.value)} >
                                <option selected="selected1">Station auswählen</option>
                                {ref.current.stations?.map((station, i) => <option key={i} value={station.id}>{station.name}</option>)}
                            </select>
                        </div>



                        <div className=" col d-flex">
                            <select className={generateClassName()} id="employee-selection" onChange={(e) => setStationEmp(e.target.value)} >
                                <option selected="selected2">Mitarbeiter zuordnen</option>
                                {ref.current.employees?.map((emp, i) => <option key={i} value={emp.id}>{emp.name}</option>)}
                            </select>
                            <div className="col">
                                <i className="bi bi-person-add" style={{"font-size": "1.5rem"}} onClick={(e) => handleSelection(e, "employee", e.target.value)}></i>
                            </div>

                        </div>

                        <div className="col d-flex">
                            <div className="d-flex">{`Bereits zugeordnet: `}</div>
                            {busyEmp.map(emp => <div>{emp.name}</div>)}
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