// AI Recommendation & Personalization Engine - aiRecommender.js

const BEHAVIOR_KEY = 'improx_reading_behavior';

export const aiRecommender = {
  // Record that a user read a post under a specific category
  recordView: (category) => {
    if (!category) return;
    try {
      const data = localStorage.getItem(BEHAVIOR_KEY);
      const history = data ? JSON.parse(data) : {};
      history[category] = (history[category] || 0) + 1;
      localStorage.setItem(BEHAVIOR_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn('AI Recommender failed to log reading behavior', err);
    }
  },

  // Get the user's top preferred category based on views
  getTopCategory: () => {
    try {
      const data = localStorage.getItem(BEHAVIOR_KEY);
      if (!data) return null;
      const history = JSON.parse(data);
      let topCat = null;
      let maxViews = 0;
      Object.keys(history).forEach((cat) => {
        if (history[cat] > maxViews) {
          maxViews = history[cat];
          topCat = cat;
        }
      });
      return topCat;
    } catch (err) {
      return null;
    }
  },

  // Recommend articles based on history
  recommendArticles: (allArticles, currentArticleId = null) => {
    const topCat = aiRecommender.getTopCategory();
    let recommendations = [];

    if (topCat) {
      // Prioritize same category
      recommendations = allArticles.filter(
        a => a.id !== currentArticleId && a.category === topCat
      );
    }

    // Fallback if no history or not enough items
    if (recommendations.length < 3) {
      const extra = allArticles.filter(
        a => a.id !== currentArticleId && !recommendations.some(r => r.id === a.id)
      );
      recommendations = [...recommendations, ...extra];
    }

    return recommendations.slice(0, 3);
  }
};
