import { useState, useEffect } from "react"
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'jszip';
import 'pdfmake';
import UserCreateModal from './UserCreateModal';

export default function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  // Registrar DataTable core (hook)
  DataTable.use(DT);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Columnas para DataTable
  const columns = [
    { title: 'ID', data: 'id' },
    {
      title: 'Usuario',
      data: null,
      render: (data) => {
        return `<div class='flex items-center'>
          <img class='h-8 w-8 rounded-full object-cover' src='${data.image || "/placeholder.svg?height=32&width=32"}' alt='${data.firstName || data.email}' />
          <div class='ml-3'><div class='text-sm font-medium text-gray-900'>${(data.firstName || '') + ' ' + (data.lastName || '') || data.email}</div></div>
        </div>`;
      }
    },
    { title: 'Email', data: 'email' },
    {
      title: 'Estado',
      data: 'status',
      render: (data, type, row) => {
        const badge = data === 'active'
          ? "<span class='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>Activo</span>"
          : "<span class='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>Inactivo</span>";
        // Switch solo para usuarios normales
        if (row.role !== 'admin') {
          return `
            <label class='relative inline-flex items-center cursor-pointer mr-3'>
              <input type='checkbox' class='sr-only peer user-status-switch' data-id='${row.id}' ${data === 'active' ? 'checked' : ''} />
              <div class='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
            </label>
            ${badge}
          `;
        }
        return badge;
      }
    },
    {
      title: 'Acciones',
      data: null,
      orderable: false,
      render: (data) => {
        return `<button class='text-blue-600 hover:text-blue-900 transition-colors ver-detalles-btn' data-id='${data.id}'>Ver detalles</button>`;
      }
    }
  ];

  // Opciones de DataTable
  const options = {
    dom: '<"flex flex-wrap items-center justify-between gap-4 mb-4 pt-8"Blf>rt<"flex flex-wrap items-center justify-between gap-4 mt-4"ip>',
    buttons: [
      {
        extend: 'excel',
        text: `<span style="display:flex;align-items:center;gap:8px"><svg xmlns='http://www.w3.org/2000/svg' class='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect width='20' height='20' x='2' y='2' rx='4' fill='#22c55e'/><path d='M8 15l4-6 4 6' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>Descargar Excel</span>`,
        className: 'dt-btn-excel bg-green-600 text-white px-5 py-3 rounded-xl font-bold text-base shadow-lg hover:bg-green-700 hover:scale-105 hover:-translate-y-1 transition-all duration-200 flex items-center gap-2',
        titleAttr: 'Exportar a Excel',
        exportOptions: {
          columns: [0, 1, 2, 3],
          format: {
            header: function (data) {
              if (data === 'ID') return 'ID';
              if (data === 'Usuario') return 'Nombre';
              if (data === 'Email') return 'Correo';
              if (data === 'Estado') return 'Estado';
              return data;
            }
          }
        },
        title: 'Lista de Usuarios - Landing Photography',
        customizeData: function(data) {
          data.body.unshift(['Lista de Usuarios - Landing Photography', '', '', '']);
        }
      },
      {
        extend: 'pdf',
        text: `<span style="display:flex;align-items:center;gap:8px"><svg xmlns='http://www.w3.org/2000/svg' class='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect width='20' height='20' x='2' y='2' rx='4' fill='#ef4444'/><path d='M8 15h8M8 11h8' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>Descargar PDF</span>`,
        className: 'dt-btn-pdf bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-base shadow-lg hover:bg-red-700 hover:scale-105 hover:-translate-y-1 transition-all duration-200 flex items-center gap-2',
        titleAttr: 'Exportar a PDF',
        exportOptions: {
          columns: [0, 1, 2, 3],
          format: {
            header: function (data) {
              if (data === 'ID') return 'ID';
              if (data === 'Usuario') return 'Nombre';
              if (data === 'Email') return 'Correo';
              if (data === 'Estado') return 'Estado';
              return data;
            }
          }
        },
        orientation: 'landscape',
        pageSize: 'A4',
        title: 'Lista de Usuarios - Landing Photography',
        customize: function (doc) {
          doc.styles.tableHeader.alignment = 'center';
          doc.styles.tableHeader.fontSize = 15;
          doc.styles.tableHeader.fillColor = '#003366';
          doc.styles.tableHeader.color = '#fff';
          doc.styles.title.fontSize = 24;
          doc.styles.title.alignment = 'center';
          // Centrar la tabla y hacerla más bonita
          const table = doc.content.find(item => item.table);
          if (table && table.table) {
            table.table.widths = ['10%', '30%', '30%', '15%'];
            // Filas alternas con fondo gris claro
            for (let i = 1; i < table.table.body.length; i++) {
              if (i % 2 === 1) {
                for (let j = 0; j < table.table.body[i].length; j++) {
                  if (!table.table.body[i][j].fillColor) {
                    table.table.body[i][j].fillColor = '#f3f4f6';
                  }
                }
              }
            }
          }
        }
      }
    ],
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ usuarios",
      info: "Mostrando _START_ a _END_ de _TOTAL_ usuarios",
      paginate: {
        previous: "Anterior",
        next: "Siguiente"
      },
      zeroRecords: "No se encontraron usuarios"
    },
    ordering: false,
    paging: true,
    info: true,
    searching: true,
    createdRow: function (row, data) {
      // Delegar click en el botón de detalles
      const btn = row.querySelector('.ver-detalles-btn');
      if (btn) {
        btn.onclick = () => onSelectUser && onSelectUser(data);
      }
      // Delegar cambio en el switch de estado
      const switchInput = row.querySelector('.user-status-switch');
      if (switchInput) {
        switchInput.onchange = async (e) => {
          const checked = e.target.checked;
          const token = localStorage.getItem('token');
          const action = checked ? 'unblock' : 'block';
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/block/${data.id}/${action}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            });
            if (!res.ok) throw new Error('No se pudo cambiar el estado');
            // Actualiza el estado localmente
            setUsers((prevUsers) =>
              prevUsers.map((u) =>
                u.id === data.id ? { ...u, status: checked ? 'active' : 'inactive' } : u
              )
            );
          } catch {
            alert('Error al cambiar el estado del usuario');
            // Revertir el switch visualmente
            e.target.checked = !checked;
          }
        };
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total de usuarios: <span className="font-medium">{users.length}</span>
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => setShowCreateModal(true)}
          >
            + Agregar usuario
          </button>
        </div>
      </div>
      <UserCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => setShowCreateModal(false)}
      />
      <div className="overflow-x-auto p-6">
        <DataTable
          data={users}
          columns={columns}
          options={options}
          className="min-w-full divide-y divide-gray-200 display"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  )
}
