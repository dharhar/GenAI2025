"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2 } from "react-feather"

const MedicalHistoryTab = () => {
  // Predefined list of conditions
  const predefinedConditions = [
    "Annual Checkup",
    "Flu",
    "Common Cold",
    "Allergies",
    "Sprained Ankle",
    "Headache/Migraine",
    "High Blood Pressure",
    "Diabetes Checkup",
    "Vaccination",
    "Physical Therapy",
    "Dental Checkup",
    "Eye Examination",
    "Other",
  ]

  const [records, setRecords] = useState([
    {
      id: 1,
      condition: "Annual Checkup",
      notes: "All vitals normal. Recommended more exercise.",
    },
    {
      id: 2,
      condition: "Flu",
      notes: "Rest for 3 days, drink plenty of fluids.",
    },
    {
      id: 3,
      condition: "Sprained Ankle",
      notes: "Avoid strenuous activity for 2 weeks.",
    },
  ])

  const [newRecord, setNewRecord] = useState({
    condition: "",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleAddRecord = () => {
    if (isEditing) {
      // Update existing record
      setRecords(records.map((record) => (record.id === editingId ? { ...record, ...newRecord } : record)))
      setIsEditing(false)
      setEditingId(null)
    } else {
      // Add new record
      const record = {
        id: records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1,
        ...newRecord,
      }
      setRecords([...records, record])
    }

    // Reset form
    setNewRecord({
      condition: "",
      notes: "",
    })
    setIsDialogOpen(false)
  }

  const handleEditRecord = (id) => {
    const recordToEdit = records.find((record) => record.id === id)
    if (recordToEdit) {
      setNewRecord({
        condition: recordToEdit.condition,
        notes: recordToEdit.notes,
      })
      setIsEditing(true)
      setEditingId(id)
      setIsDialogOpen(true)
    }
  }

  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id))
  }

  return (
    <div className="card">
      <div className="card-header flex flex-row items-center justify-between">
        <div className="card-title text-left">Medical History</div>
        <button
          className="btn btn-primary btn-sm rounded-full"
          onClick={() => {
            setIsEditing(false)
            setNewRecord({ condition: "", notes: "" })
            setIsDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Record
        </button>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="w-[200px]">Condition</th>
                <th>Notes</th>
                <th className="w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-muted">
                    No medical records found. Add your first record.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.condition}</td>
                    <td>{record.notes}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="btn btn-icon" onClick={() => handleEditRecord(record.id)}>
                          <Edit2 className="h-4 w-4" style={{ color: "var(--primary)" }} />
                        </button>
                        <button className="btn btn-icon" onClick={() => handleDeleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4" style={{ color: "var(--destructive)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2 className="dialog-title">{isEditing ? "Edit Medical Record" : "Add Medical Record"}</h2>
              <p className="dialog-description">
                {isEditing
                  ? "Update the details of your medical record."
                  : "Enter the details of your medical record below."}
              </p>
            </div>
            <div className="dialog-content">
              <div className="grid gap-4 py-4">
                <div className="form-group">
                  <label htmlFor="condition" className="form-label">
                    Condition
                  </label>
                  <select
                    id="condition"
                    className="form-input"
                    value={newRecord.condition}
                    onChange={(e) => setNewRecord({ ...newRecord, condition: e.target.value })}
                  >
                    <option value="" disabled>
                      Select a condition
                    </option>
                    {predefinedConditions.map((condition, index) => (
                      <option key={index} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    className="form-input min-h-[100px]"
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button
                className="btn btn-outline btn-md"
                onClick={() => {
                  setIsDialogOpen(false)
                  setIsEditing(false)
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-md" onClick={handleAddRecord}>
                {isEditing ? "Update" : "Add"} Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalHistoryTab

