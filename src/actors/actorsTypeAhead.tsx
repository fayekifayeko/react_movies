import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorsApiUrl } from "../endpoints";
import { Actor, ActorTypeAhead } from "../models";

interface ActorsTypeAheadProps {
fieldLabel: string;
actors: ActorTypeAhead[];
onAdd(actors:  ActorTypeAhead[]): void;
onRemove(actor: ActorTypeAhead): void;
listUI(actors: ActorTypeAhead): React.ReactNode;
}

export default function ActorsTypeAhead(props: ActorsTypeAheadProps) {

    const [draggedItem, setDraggedItem] = useState<ActorTypeAhead | undefined>(undefined);
    const [actors, setActors] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleOnSearch(query: string) {
        setIsLoading(true);
        axios.get(`${actorsApiUrl}/searchByName/${query}`)
        .then((resp: AxiosResponse<Actor[]>) => {
            setActors(resp.data);
            setIsLoading(false);
        })
    }

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
        <AsyncTypeahead
        id="typeahead"
        onChange={actors => {
            if(props.actors.findIndex(item => item.id === actors[0].id) === -1) {
                props.onAdd([...props.actors, actors[0]])
            }
        }}
        options={actors}
        selected={[]}
        labelKey={actor => actor.name}
        //filterBy={['name']}
        filterBy={() => true} // filtering will happen in the BE
        isLoading={isLoading}
        onSearch={handleOnSearch}
        placeholder="Write an actor name"
        minLength={1}
        flip={true}
        renderMenuItemChildren={actor => (
            <>
            <img alt="actor" src={actor.picture as string} style={{height: '64px', width: '64px', marginRight: '1rem'}} />
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