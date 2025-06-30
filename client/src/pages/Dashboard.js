import React, { useState, useEffect } from 'react';
import API from '../api';
import { Container, Nav, Navbar, NavDropdown, Button, Form, Card, Table } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCloudUploadAlt, FaFolderOpen, FaInfoCircle, FaSignOutAlt, FaCopy, FaDownload } from 'react-icons/fa';
import './Dashboard.css';

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
      <Navbar expand="lg" variant="dark" className="dashboard-navbar px-4 py-3">
        <Navbar.Brand className="fw-bold text-light">📁 Share Pod</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Link eventKey="upload"><FaCloudUploadAlt className="me-1" /> Upload</Nav.Link>
            <Nav.Link eventKey="files"><FaFolderOpen className="me-1" /> My Files</Nav.Link>
            <Nav.Link eventKey="about"><FaInfoCircle className="me-1" /> About</Nav.Link>
          </Nav>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="py-4 flex-grow-1">
        {activeTab === 'upload' && (
          <Form onSubmit={handleUpload}>
            <Card className="shadow-sm border-0 p-4 text-center">
              <h5 className="mb-3">Upload Files (Max 10MB)</h5>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </Card>
          </Form>
        )}

        {activeTab === 'files' && (
          <Card className="shadow-sm border-0 p-3">
            <h5 className="mb-3">My Files</h5>
            <Table striped bordered hover responsive className="mt-3 align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Filename</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => {
                  const displayName = file?.filename
                    ? file.filename.length > 25
                      ? `${file.filename.substring(0, 22)}...`
                      : file.filename
                    : 'Untitled file';
                  const downloadFilename = file?.filename || 'download';

                  return (
                    <tr key={index}>
                      <td>{displayName}</td>
                      <td>{file?.type || 'Unknown'}</td>
                      <td>{file?.size || 'N/A'}</td>
                      <td className="d-flex gap-2 flex-wrap">
                        <a
                          href={file?.url || '#'}
                          className="btn btn-sm btn-success"
                          download={downloadFilename}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!file?.url) {
                              e.preventDefault();
                              alert('Download URL not available');
                            }
                          }}
                        >
                          <FaDownload />
                        </a>
                        <CopyToClipboard
                          text={file?.url || ''}
                          onCopy={() => alert(file?.url ? 'Link copied!' : 'No URL to copy')}
                        >
                          <Button variant="info" size="sm">
                            <FaCopy />
                          </Button>
                        </CopyToClipboard>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === 'about' && (
          <Card className="shadow-sm border-0 p-4">
            <h5>About Share Pod</h5>
            <p>
              Share Pod is a lightweight file-sharing platform that lets you upload files up to 10MB and generate shareable links.
              Files are stored securely and automatically deleted within 24 hours.
            </p>
            <ul>
              <li>Secure JWT-based authentication</li>
              <li>Rate-limiting to prevent abuse</li>
              <li>Cloudinary storage & MongoDB Atlas metadata</li>
            </ul>
          </Card>
        )}
      </Container>

      <footer className="text-center bg-dark text-light py-3 mt-auto">
        <small>© 2025 Share Pod. Built with ❤️ using MERN Stack</small>
      </footer>
    </div>
  );
}

export default Dashboard;
