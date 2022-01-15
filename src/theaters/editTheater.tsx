import { TheaterForm } from ".";

export default function EditTheater () {
    return (
        <>
        <h1>Edit Theater</h1>
        <TheaterForm
          model={{name: 'Sambil', langitude: 55.38046058306013, longitude: 13.118104934692385 }}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}