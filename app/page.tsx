"use client"

import React, { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import QuestionViewer from '../components/QuestionViewer'
import NavigationControls from '../components/NavigationControls'
import { getCategories, getCategoryCounts, searchQuestionsByCategory } from '../data/loader'

export default function Page() {
  const categories = useMemo(() => getCategories(), [])
  const categoryCounts = useMemo(() => getCategoryCounts(), [])
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? 'HR')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // Get filtered questions based on category and search
  const filtered = useMemo(() => {
    return searchQuestionsByCategory(activeCategory, searchQuery)
  }, [activeCategory, searchQuery])

  // Reset index when category or search changes
  React.useEffect(() => {
    setIndex(0)
  }, [activeCategory, searchQuery])

  const current = filtered[index]

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <Sidebar
            mobile
            categoryCounts={categoryCounts}
            categories={categories}
            active={activeCategory}
            onClose={() => setMobileMenuOpen(false)}
            onSelect={(c) => {
              setActiveCategory(c)
              setMobileMenuOpen(false)
            }}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar categories={categories} categoryCounts={categoryCounts} active={activeCategory} onSelect={setActiveCategory} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          category={activeCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 py-6 md:py-8">
            {/* Search indicator */}
            {searchQuery && (
              <div className="max-w-3xl mx-auto mb-4 p-3 rounded-lg bg-indigo-900/20 border border-indigo-800 text-sm text-indigo-300">
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
            )}

            {filtered.length > 0 ? (
              <>
                <QuestionViewer q={current} />
                <NavigationControls
                  index={index}
                  total={filtered.length}
                  onNext={() => setIndex((i) => Math.min(i + 1, filtered.length - 1))}
                  onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
                />
              </>
            ) : (
              <div className="card max-w-3xl mx-auto text-center py-12">
                <p className="text-slate-400">
                  {searchQuery ? `No questions match "${searchQuery}" in ${activeCategory}.` : `No questions in this category.`}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
