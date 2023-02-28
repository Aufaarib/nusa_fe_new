export const CustomStylesTable = {
    rows: {
        style: {
            justifyContent: 'center',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            justifyContent: 'center',
            backgroundColor: '#8F0D1E',
            color: 'rgb(243 241 241)',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            justifyContent: 'center',
            fontWeight: 'bold',
            width: 'auto'
        },
    },
  };
  
  export const CustomStylesStatus = {
    content: {
      width: 'auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      cursor: 'auto',
      padding: '30px'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.5)',
      cursor: 'pointer'
    }
  };
  
  export const CustomStylesModalHapus = {
    content: {
      width: 'auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      cursor: 'auto',
      padding: '18px'
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.5)',
      cursor: 'pointer'
    }
  };