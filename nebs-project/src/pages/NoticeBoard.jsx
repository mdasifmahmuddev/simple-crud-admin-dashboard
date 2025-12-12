import { useState, useEffect } from 'react';
import { X, Upload, Trash2, Eye } from 'lucide-react';

export default function NoticeBoard() {
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetDepartment: '',
    noticeTitle: '',
    employeeId: '',
    employeeName: '',
    position: '',
    noticeType: '',
    publishDate: '',
    noticeBody: '',
    attachment: null
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notices');
      const result = await response.json();
      if (result.success) {
        setNotices(result.data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, attachment: file.name }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Notice published successfully!');
        setShowModal(false);
        setFormData({
          targetDepartment: '',
          noticeTitle: '',
          employeeId: '',
          employeeName: '',
          position: '',
          noticeType: '',
          publishDate: '',
          noticeBody: '',
          attachment: null
        });
        fetchNotices();
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      alert('Failed to publish notice. Make sure backend is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchNotices();
        }
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notice Management</h1>
          <div className="flex gap-4 mt-2">
            <span className="text-sm text-blue-600 font-medium">Active Notice: {notices.length}</span>
            <span className="text-sm text-gray-500">Total Notice: {notices.length}</span>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Create Notice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {notices.length === 0 ? (
          <p className="p-8 text-center text-gray-500">No notices available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notice Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{notice.noticeTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{notice.noticeType}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{notice.targetDepartment}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{notice.employeeName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{notice.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{notice.publishDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(notice._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Create a Notice</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">Please fill in the details below</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Department/s or Individual <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="targetDepartment"
                    value={formData.targetDepartment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Individual</option>
                    <option value="Individual">Individual</option>
                    <option value="IT Department">IT Department</option>
                    <option value="HR Department">HR Department</option>
                    <option value="Sales Department">Sales Department</option>
                    <option value="Finance Department">Finance Department</option>
                    <option value="All Department">All Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="noticeTitle"
                    value={formData.noticeTitle}
                    onChange={handleChange}
                    placeholder="Write the Title of Notice"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Employee ID <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select employee designation</option>
                      <option value="EMP001">EMP001</option>
                      <option value="EMP002">EMP002</option>
                      <option value="EMP003">EMP003</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleChange}
                      placeholder="Enter employee Full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select employee department</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notice Type <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="noticeType"
                      value={formData.noticeType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Notice Type</option>
                      <option value="General / Company-wide">General / Company-wide</option>
                      <option value="Holiday & Event">Holiday & Event</option>
                      <option value="Finance & Payroll">Finance & Payroll</option>
                      <option value="HR & Admin Update">HR & Admin Update</option>
                      <option value="IT System Message">IT System Message</option>
                      <option value="Warning / Disciplinary">Warning / Disciplinary</option>
                      <option value="Department / Team Update">Department / Team Update</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publish Date <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Body <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="noticeBody"
                    value={formData.noticeBody}
                    onChange={handleChange}
                    placeholder="Write the details about notice"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Attachments (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="mx-auto text-blue-500 mb-2" size={40} />
                    <p className="text-sm text-gray-600 mb-1">
                      Upload verified contents or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Accepted file types: .pdf, .doc (.docx) (5mb max.)
                    </p>
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden" 
                      id="fileUpload"
                    />
                    <label 
                      htmlFor="fileUpload"
                      className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Choose File
                    </label>
                    {formData.attachment && (
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-600">📄 {formData.attachment}</span>
                        <button 
                          onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2 border border-blue-300 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Save as Draft
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Publishing...' : 'Publish Notice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}