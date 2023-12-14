// Mocked data for demonstration
const mockAlerts = [
  {
    id: "6049dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Unsafe driving",
    vehicle_id: "cc70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Ramesh",
    vehicle_friendly_name: "KA12A3456",
    timestamp: "2023-12-01T04:25:45.424Z",
  },
  {
    id: "5149dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Distracted driver",
    vehicle_id: "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Suresh",
    vehicle_friendly_name: "MH12A3456",
    timestamp: "2023-03-01T04:24:45.424Z",
  },{
    id: "6249dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Speeding",
    vehicle_id: "ee70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Arjun",
    vehicle_friendly_name: "DL03B4567",
    timestamp: "2023-03-01T04:26:45.424Z"
  },
  {
    id: "7349dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Unsafe driving",
    vehicle_id: "ff70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Priya",
    vehicle_friendly_name: "TN02C7890",
    timestamp: "2023-03-01T04:27:45.424Z"
  },
  {
    id: "8449dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Distracted driver",
    vehicle_id: "gg70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Vikas",
    vehicle_friendly_name: "KL09X1234",
    timestamp: "2023-03-01T04:28:45.424Z"
  },
  {
    id: "9549dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Speeding",
    vehicle_id: "hh70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Anita",
    vehicle_friendly_name: "UP15Y5678",
    timestamp: "2023-03-01T04:29:45.424Z"
  },
  {
    id: "0649dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Unsafe driving",
    vehicle_id: "ii70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Raj",
    vehicle_friendly_name: "RJ23Z8901",
    timestamp: "2023-03-01T04:30:45.424Z"
  },
  {
    id: "1749dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Distracted driver",
    vehicle_id: "jj70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Neha",
    vehicle_friendly_name: "GJ07P2345",
    timestamp: "2023-03-01T04:31:45.424Z"
  },
  {
    id: "2849dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Speeding",
    vehicle_id: "kk70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Kumar",
    vehicle_friendly_name: "MP36Q6789",
    timestamp: "2023-03-01T04:32:45.424Z"
  },
  {
    id: "3949dbd2-45bc-4e34-9ea2-c82ced0279f1",
    alert_type: "Unsafe driving",
    vehicle_id: "ll70a7e5-8397-4914-bbbb-4d6bb521ec67",
    driver_friendly_name: "Meera",
    vehicle_friendly_name: "AP29R1234",
    timestamp: "2023-03-01T04:33:45.424Z"
  }
];

function displayAlerts(alerts) {
  const alertsContainer = document.getElementById("alertsContainer");
  alertsContainer.innerHTML = ""; 

  alerts.forEach((alert) => {
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `
            <div>
                <strong>${alert.alert_type}</strong> - ${alert.driver_friendly_name} driving ${alert.vehicle_friendly_name}
                <p>Timestamp: ${alert.timestamp}</p>
                <button onclick="markAsFalseAlarm('${alert.id}')">Mark as False Alarm</button>
            </div>
            <hr>
        `;
    alertsContainer.appendChild(alertDiv);
  });
}


function getVehicles() {
  
  return [
    { id: "dd70a7e5-8397-4914-bbbb-4d6bb521ec67", friendly_name: "KA12A3456" },
    { id: "cc70a7e5-8397-4914-bbbb-4d6bb521ec67", friendly_name: "MH12A3456" },
  ];
}

function populateVehicleDropdown() {
  const vehicles = getVehicles();
  const searchVehicleDropdown = document.getElementById("searchVehicle");

  searchVehicleDropdown.innerHTML = '<option value="">All Vehicles</option>';

  vehicles.forEach((vehicle) => {
    const option = document.createElement("option");
    option.value = vehicle.id;
    option.textContent = vehicle.friendly_name;
    searchVehicleDropdown.appendChild(option);
  });
}

populateVehicleDropdown();

function searchAlerts() {
  const searchText = document.getElementById("searchText").value.toLowerCase();
  const searchField = document.getElementById("searchField").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const selectedVehicleId = document.getElementById("searchVehicle").value;

  const filteredAlerts = mockAlerts.filter((alert) => {
    const textMatch =
      alert.alert_type.toLowerCase().includes(searchText) ||
      alert.driver_friendly_name.toLowerCase().includes(searchText) ||
      alert.vehicle_friendly_name.toLowerCase().includes(searchText);

    const fieldMatch =
      searchField === "all"
        ? textMatch
        : alert[searchField].toLowerCase().includes(searchText);

    const dateMatch =
      (!startDate || new Date(alert.timestamp) >= new Date(startDate)) &&
      (!endDate || new Date(alert.timestamp) <= new Date(endDate));

    const vehicleMatch =
      !selectedVehicleId || alert.vehicle_id === selectedVehicleId;

    return textMatch && fieldMatch && dateMatch && vehicleMatch;
  });

  displayAlerts(filteredAlerts);
}

function markAsFalseAlarm(alertId) {
  alert(`Marked alert ${alertId} as a false alarm`);
}

displayAlerts(mockAlerts);

