import React, { useState, useEffect } from 'react';
import API from '../api';
import { Container, Row, Col, Nav, Button, Form, Card, Table } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCloudUploadAlt, FaFolderOpen, FaInfoCircle, FaSignOutAlt, FaCopy, FaDownload } from 'react-icons/fa';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await API.get('/files/my-files');
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'files') fetchFiles();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || file.size > 10 * 1024 * 1024) {
      alert('File is missing or exceeds 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await API.post('/files/upload', formData);
      setFile(null);
      alert('File uploaded!');
      fetchFiles();
      setActiveTab('files');
    } catch (err) {
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-navbar d-flex justify-content-between align-items-center px-4 py-2 bg-dark text-light">
        <h4>📁 Share Pod</h4>
        <Nav variant="pills" activeKey={activeTab} onSelect={setActiveTab} className="gap-3">
          <Nav.Item><Nav.Link eventKey="upload"><FaCloudUploadAlt /> Upload</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="files"><FaFolderOpen /> My Files</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="about"><FaInfoCircle /> About</Nav.Link></Nav.Item>
          <Button variant="danger" size="sm" onClick={handleLogout}><FaSignOutAlt /> Logout</Button>
        </Nav>
      </header>

      <Container className="py-4">
        {activeTab === 'upload' && (
          <Form onSubmit={handleUpload}>
            <Card className="p-4 text-center">
              <h5>Upload Files (Max 10MB)</h5>
              <Form.Group controlId="formFile" className="my-3">
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </Card>
          </Form>
        )}

        {activeTab === 'files' && (
          <Card className="p-3">
            <h5>My Files</h5>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.filename.length > 25 ? file.filename.slice(0, 22) + '...' : file.filename}</td>
                    <td>{file.type}</td>
                    <td>{file.size}</td>
                    <td className="d-flex gap-2">
                   <a href={file.url} className="btn btn-sm btn-success" download><FaDownload /></a>

                      <CopyToClipboard text={file.url}>
                        <Button variant="info" size="sm"><FaCopy /></Button>
                      </CopyToClipboard>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === 'about' && (
          <Card className="p-4">
            <h5>About Share Pod</h5>
            <p>
              Share Pod is a simple file-sharing platform where users can upload files up to 10MB and get a shareable link.
              Files are stored securely on Cloudinary and are auto-deleted within 24 hours to ensure privacy.
            </p>
            <ul>
              <li>JWT Authentication protects access.</li>
              <li>Rate-limiting prevents abuse.</li>
              <li>Metadata is stored on MongoDB Atlas.</li>
            </ul>
          </Card>
        )}
      </Container>

      <footer className="text-center bg-light py-3 mt-auto">
        <small>© 2024 Share Pod. Built with ❤️ using MERN Stack</small>
      </footer>
    </div>
  );
}

export default Dashboard;
