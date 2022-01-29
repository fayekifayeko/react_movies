import { TheaterForm } from ".";
import { theatersApiUrl } from "../endpoints";
import { Theater } from "../models";
import { EditEntity } from "../shared";

export default function EditTheater () {
    return (
      <>
      <EditEntity<Theater, Theater>
  apiUrl={theatersApiUrl}
  redirectUrl="/theaters"
  entityName="Theaters"
  >
        {(actor, edit) => 
          <TheaterForm
          model={actor}
          onSubmit={async value => {
            await edit(value);
        }} /> }
</EditEntity>
  </>
    );
}