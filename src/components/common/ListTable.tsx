import { DataTable } from 'primereact/datatable'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { loadingSpinner } from './loaderSpinner'

type Params = {
  list: any;
  headerTable: any;
}


function ListTable({list, headerTable}:Params) {

  return (
    <Card className="w-full capitalize">
      <DataTable value={list}
        header={headerTable} 
        stripedRows 
        size="small" 
        paginator 
        rows={5} 
        showGridlines
        emptyMessage={loadingSpinner}
      >
        <Column field="_id" header="Id"></Column>
        <Column field="from" header="From"></Column>
        <Column field="to" header="To"></Column>
        <Column field="subject" header="Subject"></Column>
        <Column field="message" header="Message"></Column>
        <Column field="channel" header="Channel"></Column>
        <Column field="user_id" header="User Id"></Column>
        <Column field="user_name" header="User Name"></Column>
        <Column field="created_at" header="Date"></Column>
      </DataTable>
    </Card>
  )
}

export default ListTable
