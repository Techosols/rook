import React, { useState, useRef } from 'react'
import { MessageSquare, AlertTriangle, Slash, Zap, Check } from 'lucide-react'
import useMatches from '../../hooks/useMatches'
import useModel from '../../hooks/useModel'

// Self-contained DisconnectReason component (no props)
function DisconnectReason() {
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef(null)
  const suggestions = [
    'Match not a good fit',
    'No response after connecting',
    'Inappropriate messages',
    'Prefer other candidates'
  ]

  const { disconnectUser } = useMatches();
  const { model, closeModel } = useModel();

  const addSuggestion = (s) => {
    const newNote = note + (note ? '\n' : '') + s
    setNote(newNote)
    // move focus to textarea
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const onSubmit = async () => {
    // require at least a short note
    if (note.trim().length < 3) {
      setError('Please enter a short note (at least 3 characters)')
      return
    }
    setError('')

   const res = await disconnectUser(model?.externalId, note);
   if (res.status == 200) {
     setSubmitted(true)
     setNote('')
     // notify opener (e.g., ProfileCard) that the disconnect completed
     try {
       model?.onDone && model.onDone({ success: true, note: note.trim() })
     } catch {
       // ignore
     }
     closeModel();
   }
  }

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <Slash className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Disconnect user</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tell us why you're disconnecting this user (helps moderation).</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Note</label>
        <textarea ref={textareaRef} value={note} onChange={(e) => setNote(e.target.value)} rows={6} placeholder="Add a short note" className="mt-2 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none" />

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button key={s} type="button" onClick={() => addSuggestion(s)} className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-800 dark:text-gray-100">{s}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button type="button" onClick={() => { setNote(''); }} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">Reset</button>
          <button type="button" onClick={onSubmit} className="px-4 py-2 rounded-lg bg-red-600 text-white">Submit note</button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {submitted && <p className="mt-3 text-sm text-green-600">Reason submitted</p>}
    </div>
  )
}

export default DisconnectReason
