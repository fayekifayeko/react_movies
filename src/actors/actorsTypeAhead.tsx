import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ActorTypeAhead } from "../models";

interface ActorsTypeAheadProps {
fieldLabel: string;
actors: ActorTypeAhead[];
onAdd(actors:  ActorTypeAhead[]): void;
onRemove(actor: ActorTypeAhead): void;
listUI(actors: ActorTypeAhead): React.ReactNode;
}

export default function ActorsTypeAhead(props: ActorsTypeAheadProps) {

    const [draggedItem, setDraggedItem] = useState<ActorTypeAhead | undefined>(undefined);

   const actors: ActorTypeAhead[] = [
        {
            id: 1, name: 'Fellip', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/250px-Tom_Cruise_by_Gage_Skidmore_2.jpg'
        },
        {
            id: 2, name: 'Fernando', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/250px-Brad_Pitt_2019_by_Glenn_Francis.jpg'
 
        },
        {
            id: 3, name: 'Jessica', character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Angelina_Jolie_Global_Summit_2014.jpg/250px-Angelina_Jolie_Global_Summit_2014.jpg'

        }
    ];

    function handleDragStart(actor: ActorTypeAhead) {
        setDraggedItem(actor);
    }

    function handleDragOver(actor: ActorTypeAhead) {

        if(!draggedItem) return;

        if(actor.id !== draggedItem.id) {
            const draggedItemIndex = props.actors.findIndex(item => item.id === draggedItem.id);
            const draggedOverItemIndex = props.actors.findIndex(item => item.id === actor.id);
            const actors = [...props.actors];
            actors[draggedItemIndex] = actor;
            actors[draggedOverItemIndex] = draggedItem;
            props.onAdd(actors);
        }
        
    }

    return(
        <div className="mb-3">
        <label>{props.fieldLabel}</label>
        <Typeahead
        id="typeahead"
        onChange={actors => {
            if(props.actors.findIndex(item => item.id === actors[0].id) === -1) {
                props.onAdd([...props.actors, actors[0]])
            }
        }}
        options={actors}
        selected={[]}
        labelKey={actor => actor.name}
        filterBy={['name']}
        placeholder="Write an actor name"
        minLength={1}
        flip={true}
        renderMenuItemChildren={actor => (
            <>
            <img alt="actor" src={actor.picture} style={{height: '64px', width: '64px', marginRight: '1rem'}} />
            <span>{actor.name}</span>
            </>
        )}
        />
        <ul className="list-group">
            {props.actors.map(item => 
            (
            <li key={item.id} 
            className="list-group-item list-group-item-action"
            draggable={true}
            onDragStart={() => handleDragStart(item)}
            onDragOver={() => handleDragOver(item)}
            >
                {props.listUI(item)}
                <span 
                className="badge badge-primary badge-pill pointer text-dark" 
                style={{marginLeft: '1rem'}}
                onClick={() => props.onRemove(item)}
                >x</span>
            </li>
            ))}
        </ul>
        </div>
    );
}