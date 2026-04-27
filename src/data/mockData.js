// HIS Clinical Engineering — Mock Data
// All values based on Loading Time = 720 hours/month
// Formulas: Availability = UpTime/720, PerfEff = OpTime/UpTime,
//           λ = DownTime/720, MTBF = 1/λ

export const LOADING_TIME = 720;

export const equipment = [
  { id:1, name:"Ventilator", department:"ICU", status:"Operational", upTime:688, downTime:32, operatingTime:610, standbyTime:78, availability:95.6, performanceEfficiency:88.7, failureRate:0.044, mtbf:22.5, maintenanceLevel:"Organizational", serialNumber:"VN-2024-001", manufacturer:"Draeger", model:"Evita V500", purchaseDate:"2024-01-15", totalRepairs:3 },
  { id:2, name:"ECG Machine", department:"Cardiology", status:"Operational", upTime:700, downTime:20, operatingTime:650, standbyTime:50, availability:97.2, performanceEfficiency:92.9, failureRate:0.028, mtbf:36.0, maintenanceLevel:"Organizational", serialNumber:"ECG-8812-B", manufacturer:"GE Health", model:"MAC 5500", purchaseDate:"2023-11-10", totalRepairs:1 },
  { id:3, name:"Defibrillator", department:"Emergency", status:"Under Maintenance", upTime:600, downTime:120, operatingTime:520, standbyTime:80, availability:83.3, performanceEfficiency:86.7, failureRate:0.167, mtbf:6.0, maintenanceLevel:"Intermediate", serialNumber:"DEF-4491-X", manufacturer:"Zoll", model:"R Series", purchaseDate:"2024-03-05", totalRepairs:5 },
  { id:4, name:"Infusion Pump", department:"Surgery", status:"Operational", upTime:710, downTime:10, operatingTime:690, standbyTime:20, availability:98.6, performanceEfficiency:97.2, failureRate:0.014, mtbf:72.0, maintenanceLevel:"Organizational", serialNumber:"IP-7721-S", manufacturer:"B. Braun", model:"Infusomat Space", purchaseDate:"2025-01-20", totalRepairs:0 },
  { id:5, name:"Patient Monitor", department:"General Ward", status:"Operational", upTime:695, downTime:25, operatingTime:640, standbyTime:55, availability:96.5, performanceEfficiency:92.1, failureRate:0.035, mtbf:28.8, maintenanceLevel:"Organizational", serialNumber:"PM-5501-W", manufacturer:"Philips", model:"IntelliVue MX450", purchaseDate:"2024-06-12", totalRepairs:2 },
  { id:6, name:"X-Ray Machine", department:"Radiology", status:"Operational", upTime:660, downTime:60, operatingTime:580, standbyTime:80, availability:91.7, performanceEfficiency:87.9, failureRate:0.083, mtbf:12.0, maintenanceLevel:"Intermediate", serialNumber:"XR-9901-R", manufacturer:"Siemens", model:"Multix Impact", purchaseDate:"2023-05-15", totalRepairs:4 },
  { id:7, name:"Ultrasound Scanner", department:"Radiology", status:"Under Maintenance", upTime:580, downTime:140, operatingTime:500, standbyTime:80, availability:80.6, performanceEfficiency:86.2, failureRate:0.194, mtbf:5.1, maintenanceLevel:"Intermediate", serialNumber:"US-1123-R", manufacturer:"Mindray", model:"DC-80", purchaseDate:"2023-08-20", totalRepairs:6 },
  { id:8, name:"Anesthesia Machine", department:"Surgery", status:"Operational", upTime:705, downTime:15, operatingTime:660, standbyTime:45, availability:97.9, performanceEfficiency:93.6, failureRate:0.021, mtbf:48.0, maintenanceLevel:"Organizational", serialNumber:"AM-3341-S", manufacturer:"GE Health", model:"Avance CS2", purchaseDate:"2024-12-01", totalRepairs:1 },
  { id:9, name:"Pulse Oximeter", department:"ICU", status:"Operational", upTime:715, downTime:5, operatingTime:700, standbyTime:15, availability:99.3, performanceEfficiency:97.9, failureRate:0.007, mtbf:144.0, maintenanceLevel:"Organizational", serialNumber:"PO-2211-I", manufacturer:"Masimo", model:"Rad-97", purchaseDate:"2025-02-15", totalRepairs:0 },
  { id:10, name:"MRI Scanner", department:"Radiology", status:"Out of Service", upTime:480, downTime:240, operatingTime:400, standbyTime:80, availability:66.7, performanceEfficiency:83.3, failureRate:0.333, mtbf:3.0, maintenanceLevel:"Depot", serialNumber:"MRI-0001-R", manufacturer:"Philips", model:"Ingenia Elition", purchaseDate:"2022-10-01", totalRepairs:12 },
  { id:11, name:"CT Scanner", department:"Radiology", status:"Operational", upTime:690, downTime:30, operatingTime:620, standbyTime:70, availability:95.8, performanceEfficiency:89.9, failureRate:0.042, mtbf:24.0, maintenanceLevel:"Intermediate", serialNumber:"CT-1102-R", manufacturer:"Canon", model:"Aquilion One", purchaseDate:"2023-01-30", totalRepairs:2 },
  { id:12, name:"Dialysis Machine", department:"Nephrology", status:"Operational", upTime:680, downTime:40, operatingTime:640, standbyTime:40, availability:94.4, performanceEfficiency:94.1, failureRate:0.056, mtbf:18.0, maintenanceLevel:"Intermediate", serialNumber:"DM-4451-N", manufacturer:"Fresenius", model:"4008S", purchaseDate:"2024-03-28", totalRepairs:3 },
  { id:13, name:"Infant Incubator", department:"NICU", status:"Operational", upTime:712, downLine:8, operatingTime:700, standbyTime:12, availability:98.9, performanceEfficiency:98.3, failureRate:0.011, mtbf:90.0, maintenanceLevel:"Organizational", serialNumber:"INC-8821-N", manufacturer:"Drager", model:"Isolette 8000", purchaseDate:"2024-02-15", totalRepairs:1 },
  { id:14, name:"Hematology Analyzer", department:"Laboratory", status:"Under Maintenance", upTime:640, downTime:80, operatingTime:600, standbyTime:40, availability:88.9, performanceEfficiency:93.8, failureRate:0.111, mtbf:9.0, maintenanceLevel:"Intermediate", serialNumber:"HA-9931-L", manufacturer:"Sysmex", model:"XN-1000", purchaseDate:"2023-11-15", totalRepairs:5 },
  { id:15, name:"Electrosurgical Unit", department:"Surgery", status:"Operational", upTime:702, downTime:18, operatingTime:680, standbyTime:22, availability:97.5, performanceEfficiency:96.9, failureRate:0.025, mtbf:40.0, maintenanceLevel:"Organizational", serialNumber:"ESU-4411-S", manufacturer:"Erbe", model:"VIO 300 D", purchaseDate:"2024-01-10", totalRepairs:2 },
  { id:16, name:"Chemistry Analyzer", department:"Laboratory", status:"Operational", upTime:695, downTime:25, operatingTime:650, standbyTime:45, availability:96.5, performanceEfficiency:93.5, failureRate:0.035, mtbf:28.8, maintenanceLevel:"Intermediate", serialNumber:"CA-5521-L", manufacturer:"Roche", model:"Cobas 6000", purchaseDate:"2023-03-15", totalRepairs:3 },
  { id:17, name:"BiPAP Machine", department:"Pulmonology", status:"Operational", upTime:710, downTime:10, operatingTime:690, standbyTime:20, availability:98.6, performanceEfficiency:97.2, failureRate:0.014, mtbf:72.0, maintenanceLevel:"Organizational", serialNumber:"BP-7701-P", manufacturer:"ResMed", model:"AirCurve 10", purchaseDate:"2024-12-01", totalRepairs:1 },
  { id:18, name:"Operating Table", department:"Surgery", status:"Operational", upTime:718, downTime:2, operatingTime:710, standbyTime:8, availability:99.7, performanceEfficiency:98.9, failureRate:0.003, mtbf:360.0, maintenanceLevel:"Organizational", serialNumber:"OT-1101-S", manufacturer:"Maquet", model:"Alphamaquet", purchaseDate:"2023-06-01", totalRepairs:0 },
  { id:19, name:"Mobile C-Arm", department:"Radiology", status:"Under Maintenance", upTime:610, downTime:110, operatingTime:550, standbyTime:60, availability:84.7, performanceEfficiency:90.2, failureRate:0.153, mtbf:6.5, maintenanceLevel:"Intermediate", serialNumber:"CA-9981-R", manufacturer:"GE Health", model:"OEC Elite", purchaseDate:"2023-04-23", totalRepairs:7 },
  { id:20, name:"Blood Bank Refrigerator", department:"Laboratory", status:"Operational", upTime:719, downTime:1, operatingTime:719, standbyTime:0, availability:99.9, performanceEfficiency:100.0, failureRate:0.001, mtbf:720.0, maintenanceLevel:"Organizational", serialNumber:"BR-1121-L", manufacturer:"Haier", model:"HXC-158", purchaseDate:"2024-04-01", totalRepairs:0 },
  { id:21, name:"Endoscope", department:"GI Suite", status:"Under Maintenance", upTime:590, downTime:130, operatingTime:500, standbyTime:90, availability:81.9, performanceEfficiency:84.7, failureRate:0.181, mtbf:5.5, maintenanceLevel:"Intermediate", serialNumber:"EN-4451-G", manufacturer:"Olympus", model:"Evis Exera III", purchaseDate:"2023-05-01", totalRepairs:8 },
  { id:22, name:"Laser Lithotripter", department:"Urology", status:"Operational", upTime:670, downTime:50, operatingTime:600, standbyTime:70, availability:93.1, performanceEfficiency:89.6, failureRate:0.069, mtbf:14.4, maintenanceLevel:"Intermediate", serialNumber:"LL-2231-U", manufacturer:"Lumenis", model:"Pulse 120H", purchaseDate:"2024-01-24", totalRepairs:2 },
  { id:23, name:"Surgical Microscope", department:"Ophthalmology", status:"Operational", upTime:700, downTime:20, operatingTime:660, standbyTime:40, availability:97.2, performanceEfficiency:94.3, failureRate:0.028, mtbf:36.0, maintenanceLevel:"Intermediate", serialNumber:"SM-3351-O", manufacturer:"Zeiss", model:"OPMI Lumera", purchaseDate:"2024-03-24", totalRepairs:1 },
  { id:24, name:"Patient Warming System", department:"Recovery", status:"Operational", upTime:715, downTime:5, operatingTime:700, standbyTime:15, availability:99.3, performanceEfficiency:97.9, failureRate:0.007, mtbf:144.0, maintenanceLevel:"Organizational", serialNumber:"PW-2201-R", manufacturer:"3M", model:"Bair Hugger", purchaseDate:"2024-09-01", totalRepairs:0 },
  { id:25, name:"Suction Machine", department:"General Ward", status:"Operational", upTime:712, downTime:8, operatingTime:680, standbyTime:32, availability:98.9, performanceEfficiency:95.5, failureRate:0.011, mtbf:90.0, maintenanceLevel:"Organizational", serialNumber:"SC-5501-G", manufacturer:"Laerdal", model:"LSU", purchaseDate:"2025-01-01", totalRepairs:0 },
];

export const spareParts = [
  { id: "P001", name: "Lead-Acid Battery (12V 7Ah)", category: "Power", unitCost: 45, stock: 12 },
  { id: "P002", name: "Oxygen Sensor", category: "Sensors", unitCost: 120, stock: 5 },
  { id: "P003", name: "HEPA Filter Kit", category: "Filters", unitCost: 35, stock: 20 },
  { id: "P004", name: "ECG Trunk Cable", category: "Cables", unitCost: 85, stock: 8 },
  { id: "P005", name: "NIBP Cuff (Adult)", category: "Accessories", unitCost: 25, stock: 15 },
  { id: "P006", name: "Pump Tubing Set", category: "Consumables", unitCost: 15, stock: 50 },
  { id: "P007", name: "Vacuum Filter", category: "Filters", unitCost: 12, stock: 30 },
];

export const workOrders = [
  { id:"WO-001", equipment:"MRI Scanner", department:"Radiology", type:"Corrective", priority:"High", status:"In Progress", dateReported:"2026-04-20", assignedTo:"Ahmed K.", daysOpen:6, laborHours: 12, partsUsed: ["P001", "P004"] },
  { id:"WO-002", equipment:"Defibrillator", department:"Emergency", type:"Corrective", priority:"High", status:"Pending", dateReported:"2026-04-22", assignedTo:"Sara M.", daysOpen:4, laborHours: 2, partsUsed: ["P001"] },
  { id:"WO-003", equipment:"Ultrasound Scanner", department:"Radiology", type:"Corrective", priority:"Medium", status:"In Progress", dateReported:"2026-04-18", assignedTo:"Omar F.", daysOpen:8, laborHours: 4, partsUsed: ["P002"] },
  { id:"WO-004", equipment:"X-Ray Machine", department:"Radiology", type:"Preventive (PM)", priority:"Low", status:"Completed", dateReported:"2026-04-10", assignedTo:"Ahmed K.", daysOpen:0, laborHours: 3, partsUsed: ["P003"] },
  { id:"WO-005", equipment:"Ventilator", department:"ICU", type:"Preventive (PM)", priority:"Medium", status:"Scheduled", dateReported:"2026-04-28", assignedTo:"Sara M.", daysOpen:0, laborHours: 0, partsUsed: [] },
  { id:"WO-006", equipment:"ECG Machine", department:"Cardiology", type:"Corrective", priority:"Low", status:"Completed", dateReported:"2026-04-08", assignedTo:"Omar F.", daysOpen:0, laborHours: 1.5, partsUsed: ["P004", "P005"] },
  { id:"WO-007", equipment:"Hematology Analyzer", department:"Laboratory", type:"Corrective", priority:"High", status:"Pending", dateReported:"2026-04-25", assignedTo:"Ahmed K.", daysOpen:2, laborHours: 5, partsUsed: ["P002", "P003"] },
  { id:"WO-008", equipment:"Mobile C-Arm", department:"Radiology", type:"Corrective", priority:"Medium", status:"In Progress", dateReported:"2026-04-23", assignedTo:"Sara M.", daysOpen:4, laborHours: 6, partsUsed: ["P001", "P003"] },
  { id:"WO-009", equipment:"Endoscope", department:"GI Suite", type:"Corrective", priority:"High", status:"In Progress", dateReported:"2026-04-24", assignedTo:"Omar F.", daysOpen:3, laborHours: 8, partsUsed: ["P006"] },
  { id:"WO-010", equipment:"Dialysis Machine", department:"Nephrology", type:"Preventive (PM)", priority:"Medium", status:"Scheduled", dateReported:"2026-04-30", assignedTo:"Ahmed K.", daysOpen:0, laborHours: 0, partsUsed: [] },
  { id:"WO-011", equipment:"CT Scanner", department:"Radiology", type:"Corrective", priority:"High", status:"Completed", dateReported:"2026-04-05", assignedTo:"Sara M.", daysOpen:0, laborHours: 15, partsUsed: ["P002", "P004"] },
  { id:"WO-012", equipment:"Infusion Pump", department:"Surgery", type:"Preventive (PM)", priority:"Low", status:"Completed", dateReported:"2026-04-02", assignedTo:"Omar F.", daysOpen:0, laborHours: 1, partsUsed: ["P006"] },
  { id:"WO-013", equipment:"Patient Monitor", department:"General Ward", type:"Corrective", priority:"Medium", status:"Completed", dateReported:"2026-04-12", assignedTo:"Ahmed K.", daysOpen:0, laborHours: 2, partsUsed: ["P005"] },
  { id:"WO-014", equipment:"Anesthesia Machine", department:"Surgery", type:"Preventive (PM)", priority:"Medium", status:"Scheduled", dateReported:"2026-05-02", assignedTo:"Sara M.", daysOpen:0, laborHours: 0, partsUsed: [] },
  { id:"WO-015", equipment:"Pulse Oximeter", department:"ICU", type:"Corrective", priority:"Low", status:"Pending", dateReported:"2026-04-26", assignedTo:"Omar F.", daysOpen:1, laborHours: 0.5, partsUsed: [] },
];

export const ipmSchedule = [
  { id:"IPM-001", equipment:"Anesthesia Machine", department:"Surgery", frequency:"Monthly", lastDone:"2026-03-25", nextDue:"2026-04-25", status:"Overdue", assignedTo:"Ahmed K." },
  { id:"IPM-002", equipment:"Defibrillator", department:"Emergency", frequency:"Quarterly", lastDone:"2026-02-10", nextDue:"2026-05-10", status:"Upcoming", assignedTo:"Sara M." },
  { id:"IPM-003", equipment:"Ventilator", department:"ICU", frequency:"Monthly", lastDone:"2026-03-30", nextDue:"2026-04-30", status:"Upcoming", assignedTo:"Omar F." },
  { id:"IPM-004", equipment:"Patient Monitor", department:"General Ward", frequency:"Semi-Annual", lastDone:"2025-11-01", nextDue:"2026-05-01", status:"Upcoming", assignedTo:"Ahmed K." },
  { id:"IPM-005", equipment:"X-Ray Machine", department:"Radiology", frequency:"Quarterly", lastDone:"2026-01-15", nextDue:"2026-04-15", status:"Overdue", assignedTo:"Sara M." },
  { id:"IPM-006", equipment:"Infusion Pump", department:"Surgery", frequency:"Annual", lastDone:"2025-04-01", nextDue:"2026-04-01", status:"Completed", assignedTo:"Omar F." },
  { id:"IPM-007", equipment:"ECG Machine", department:"Cardiology", frequency:"Semi-Annual", lastDone:"2026-01-20", nextDue:"2026-07-20", status:"Upcoming", assignedTo:"Ahmed K." },
  { id:"IPM-008", equipment:"MRI Scanner", department:"Radiology", frequency:"Quarterly", lastDone:"2026-02-01", nextDue:"2026-05-01", status:"Upcoming", assignedTo:"Sara M." },
  { id:"IPM-009", equipment:"CT Scanner", department:"Radiology", frequency:"Quarterly", lastDone:"2026-01-30", nextDue:"2026-04-30", status:"Upcoming", assignedTo:"Omar F." },
  { id:"IPM-010", equipment:"Dialysis Machine", department:"Nephrology", frequency:"Monthly", lastDone:"2026-03-28", nextDue:"2026-04-28", status:"Upcoming", assignedTo:"Ahmed K." },
  { id:"IPM-011", equipment:"Infant Incubator", department:"NICU", frequency:"Semi-Annual", lastDone:"2026-02-15", nextDue:"2026-08-15", status:"Upcoming", assignedTo:"Sara M." },
  { id:"IPM-012", equipment:"Electrosurgical Unit", department:"Surgery", frequency:"Quarterly", lastDone:"2026-01-10", nextDue:"2026-04-10", status:"Overdue", assignedTo:"Omar F." },
  { id:"IPM-013", equipment:"Chemistry Analyzer", department:"Laboratory", frequency:"Monthly", lastDone:"2026-03-15", nextDue:"2026-04-15", status:"Overdue", assignedTo:"Ahmed K." },
  { id:"IPM-014", equipment:"BiPAP Machine", department:"Pulmonology", frequency:"Semi-Annual", lastDone:"2025-12-01", nextDue:"2026-06-01", status:"Upcoming", assignedTo:"Sara M." },
  { id:"IPM-015", equipment:"Blood Bank Refrigerator", department:"Laboratory", frequency:"Monthly", lastDone:"2026-04-01", nextDue:"2026-05-01", status:"Upcoming", assignedTo:"Omar F." },
];

export const kpiSummary = {
  totalEquipment: 25,
  operational: 18,
  underMaintenance: 6,
  outOfService: 1,
  avgAvailability: 92.4,
  avgMTBF: 42.5,
  openWorkOrders: 9,
  overdueIPMs: 4,
  ipmCompletionRate: 82,
  monthlySpend: 4250, // New Field: Total Maintenance Spend
  cosr: 8.4 // New Field: Cost of Service Ratio
};
