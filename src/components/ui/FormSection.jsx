import React from 'react'
import Button from '../ui/Button'

function FormSection({children, onSave, loading, title, buttonText = 'Save'}) {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl space-y-6 transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <hr className="border-gray-200 dark:border-gray-700" />
      {children}
      <div className="pt-2">
        <Button onClick={onSave} text={buttonText} loading={loading} active={true} />
      </div>
    </div>
  );
}

export default FormSection;
