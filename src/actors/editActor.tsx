import { ActorForm } from ".";
import { actorsApiUrl } from "../endpoints";
import { Actor } from "../models";
import { EditEntity } from "../shared";
import { convertActorToFormData } from "../utils/convertActorToFormData";

export default function EditActor () {

  function transform(entity: Actor): any {
    return {
      name: entity.name,
      dateOfBirth: new Date(entity.dateOfBirth || ''),
      imgUrl: entity.picture,
      biography: entity.biography     
    }
  }
    return (
        <>
            <EditEntity<Actor, Actor>
        apiUrl={actorsApiUrl}
        redirectUrl="/actors"
        entityName="Actors"
        transformToFormData={convertActorToFormData}
        transform={transform}
        >
              {(actor, edit) => 
                <ActorForm
                model={actor}
                onSubmit={async value => {
                  await edit(value);
              }} /> }
</EditEntity>
        </>
    );
}