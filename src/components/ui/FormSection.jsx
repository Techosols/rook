import React from 'react'
import Button from '../ui/Button'
import { 
  User, 
  Heart, 
  Baby, 
  Activity, 
  Shield, 
  Star,
  ChevronRight,
  Sparkles,
  Camera,
  Images,
  Gamepad2,
  PawPrint,
  Trophy,
  Music,
  Guitar,
  MessageCircle,
  MapPin,
  BarChart3,
  Users,
  Church,
  ShieldCheck,
  UserCheck,
  Compass,
  Users2,
  Vote,
  Zap,
  Briefcase,
  UserX
} from 'lucide-react'

const sectionIcons = {
  'You': User,
  'Personal Details': User,
  'About You': Heart,
  'Kids/Pets': Baby,
  'Physical Activity': Activity,
  'Health/Habits': Shield,
  'Misc': Star,
  'Miscellaneous': Star,
  'Main Pictures': Camera,
  'Additional Pictures': Images,
  'Pictures': Camera,
  'Photos': Images,
  'Your Hobbies': Gamepad2,
  'Pets you own': PawPrint,
  'Sports Interests': Trophy,
  'Music genres you like': Music, 
  'Musical instruments you play': Guitar,
  'Conversation Starters': MessageCircle,
  'Location': MapPin,
  'Stats': BarChart3,
  'Ethnicities': Users,
  'Religions': Church,
  'Background Check Status': ShieldCheck,
  'Gender': UserCheck,
  'Orientation': Compass,
  'Relationship Types': Users2,
  'Political Affiliation': Vote,
  'Physical Activity Index': Zap,
  'Included Occupations': Briefcase,
  'Excluded Occupations': UserX,
}

const gradientStyles = {
  'You': 'from-emerald-500 via-teal-500 to-cyan-500',
  'Personal Details': 'from-emerald-500 via-teal-500 to-cyan-500',
  'About You': 'from-purple-500 via-pink-500 to-rose-500',
  'Kids/Pets': 'from-rose-500 via-orange-500 to-amber-500',
  'Physical Activity': 'from-blue-500 via-indigo-500 to-purple-500',
  'Health/Habits': 'from-red-500 via-pink-500 to-purple-500',
  'Misc': 'from-indigo-500 via-purple-500 to-pink-500',
  'Miscellaneous': 'from-indigo-500 via-purple-500 to-pink-500',
  'Main Pictures': 'from-violet-500 via-purple-500 to-fuchsia-500',
  'Additional Pictures': 'from-blue-500 via-cyan-500 to-teal-500',
  'Pictures': 'from-violet-500 via-purple-500 to-fuchsia-500',
  'Photos': 'from-blue-500 via-cyan-500 to-teal-500',
  'Your Hobbies': 'from-green-500 via-emerald-500 to-teal-500',
  'Pets you own': 'from-amber-500 via-orange-500 to-red-500',
  'Sports Interests': 'from-orange-500 via-red-500 to-pink-500',
  'Music genres you like': 'from-pink-500 via-rose-500 to-red-500',
  'Musical instruments you play': 'from-cyan-500 via-blue-500 to-indigo-500',
  'Conversation Starters': 'from-teal-500 via-cyan-500 to-blue-500',
  'Location': 'from-green-500 via-teal-500 to-cyan-500',
  'Stats': 'from-indigo-500 via-blue-500 to-cyan-500',
  'Ethnicities': 'from-purple-500 via-violet-500 to-indigo-500',
  'Religions': 'from-amber-500 via-yellow-500 to-orange-500',
  'Background Check Status': 'from-red-500 via-rose-500 to-pink-500',
  'Gender': 'from-blue-500 via-purple-500 to-pink-500',
  'Orientation': 'from-pink-500 via-purple-500 to-indigo-500',
  'Relationship Types': 'from-rose-500 via-pink-500 to-purple-500',
  'Political Affiliation': 'from-red-500 via-blue-500 to-purple-500',
  'Physical Activity Index': 'from-yellow-500 via-orange-500 to-red-500',
  'Included Occupations': 'from-green-500 via-blue-500 to-purple-500',
  'Excluded Occupations': 'from-gray-500 via-red-500 to-pink-500',
}

function FormSection({
  children, 
  onSave, 
  loading, 
  title, 
  buttonText = 'Save Changes', 
  showSaveButton = true,
  description,
  disabled = false
}) {
  const IconComponent = sectionIcons[title] || Sparkles
  const gradientClass = gradientStyles[title] || 'from-gray-500 via-gray-600 to-gray-700'
  
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header Section */}
      <div className={`relative bg-gradient-to-r ${gradientClass} p-6 overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 group-hover:bg-white/30 transition-colors duration-300">
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 tracking-wide">
                {title}
              </h2>
              {description && (
                <p className="text-white/80 text-sm font-medium">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {disabled && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                Disabled
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-8">
        {/* Content with enhanced spacing */}
        <div className="space-y-8">
          {children}
        </div>

        {/* Save Button Section */}
        {showSaveButton && (
          <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <div className="flex justify-end">
              <div className="relative group/btn">
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-xl blur-lg opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300`}></div>
                <Button 
                  onClick={onSave} 
                  text={buttonText} 
                  loading={loading} 
                  active={true}
                  disabled={disabled}
                  className={`
                    relative px-8 py-3 bg-gradient-to-r ${gradientClass} 
                    text-white font-semibold rounded-xl shadow-lg 
                    hover:shadow-xl transform hover:scale-105 
                    transition-all duration-200 border-0
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none disabled:shadow-lg
                    flex items-center space-x-2
                  `}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 border-4 border-transparent border-t-current bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent rounded-full animate-spin`}></div>
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Saving changes...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormSection;
