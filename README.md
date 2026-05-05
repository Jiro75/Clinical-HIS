# Clinical Engineering Hospital Information System (HIS)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

A professional, data-driven **Hospital Information System (HIS)** specifically designed for **Clinical Engineering and Medical Equipment Management**. This application provides a comprehensive dashboard for tracking equipment health, maintenance work orders, and reliability metrics.

---

## 📸 Screenshots

### 🖥️ Dashboard Views
| Overview | Program Performance |
| :---: | :---: |
| ![Dashboard](media/Dashboard.png) | ![Dashboard 2](media/Dashboard2.png) |

### 🛠️ Maintenance & 📋 Inventory
| Maintenance Management | Work Order Tracking | Equipment Inventory |
| :---: | :---: | :---: |
| ![Maintenance](media/M.png) | ![Maintenance 2](media/M2.png) | ![Inventory](media/EQ.png) |

### 📈 Reliability Analysis
| Reliability Overview | Failure Analysis |
| :---: | :---: |
| ![Reliability](media/RA.png) | ![Reliability 2](media/RA2.png) |

---

## ✨ Key Features

### 📊 Performance Dashboard
- **Real-time KPIs**: Track Total Equipment, Avg. Availability, Avg. MTBF, and Open Work Orders.
- **Visual Analytics**: Interactive charts powered by `Recharts` for equipment availability targets and status distribution.
- **Critical Alerts**: Highlighted work orders that have been open for more than 7 days.

### 🛠️ Maintenance Management
- **Work Order Tracking**: Full lifecycle management of Corrective and Preventive Maintenance (IPM).
- **Status Monitoring**: Filter and track tasks by priority (High, Medium, Low) and status (Pending, In Progress, Completed).
- **History Logging**: Complete audit trail of maintenance activities.

### 📋 Equipment Inventory
- **Centralized Database**: Comprehensive list of clinical assets including Scanners, Monitors, Analyzers, and more.
- **Health Indicators**: Real-time availability percentages and operational status.
- **Reliability Metrics**: Individual Mean Time Between Failures (MTBF) and Mean Time To Repair (MTTR) tracking.

### 📈 Reliability Analysis
- **Advanced Metrics**: Deep dive into equipment performance trends.
- **Failure Analysis**: Identify problematic equipment types to optimize replacement cycles.
- **Resource Allocation**: Data-backed insights for clinical engineering staffing and parts inventory.

---

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Clinical-HIS.git
   cd Clinical-HIS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
Clinical-HIS/
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Mock data and constants
│   ├── pages/           # Main feature views (Dashboard, Inventory, etc.)
│   ├── App.jsx          # Main application component & routes
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── tailwind.config.js   # Styling configuration
└── vite.config.js       # Build configuration
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ for Clinical Engineers.**
