import './App.css';
import WorkerHeartbeatsTable from './components/WorkerHeartbeatsTable';
import WorkPublisherQueueTable from './components/WorkPublisherQueueTable';

function App() {
  return (
    <div className="App">
      <WorkerHeartbeatsTable />
      <WorkPublisherQueueTable />
    </div>
  );
}

export default App;