import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const renderHeaderTable = ({globalFilterValue1}: any) => {
    const openDialog = () => {
        console.log('open')
    }

    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-plus-circle" 
          label="Novo" className="p-button-outlined" 
          onClick={() => openDialog()} 
        />
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue1} 
            onChange={(e) => console.log(e.target.value)} 
            placeholder="Pesquisar" 
          />
        </span> */}
      </div>
    )
}

export default renderHeaderTable
