import { ActorForm } from ".";

export default function EditActor () {
    return (
        <>
        <h1>Edit Actor</h1>
        <ActorForm
          model={{name: 'Tom Joe', dateOfBirth: new Date('1996-06-01T00:00:00'), imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/220px-FullMoon2010.jpg'}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}