
import { useState } from 'react';

export function useArrayFields() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [inclusionInput, setInclusionInput] = useState('');

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Technology management
  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  // Feature management
  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  // Inclusion management
  const addInclusion = () => {
    if (inclusionInput.trim() && !inclusions.includes(inclusionInput.trim())) {
      setInclusions([...inclusions, inclusionInput.trim()]);
      setInclusionInput('');
    }
  };

  const removeInclusion = (inclusion: string) => {
    setInclusions(inclusions.filter(i => i !== inclusion));
  };

  return {
    // State
    tags,
    tagInput,
    setTagInput,
    technologies,
    techInput,
    setTechInput,
    features,
    featureInput,
    setFeatureInput,
    inclusions,
    inclusionInput,
    setInclusionInput,
    
    // Handlers
    addTag,
    removeTag,
    addTechnology,
    removeTechnology,
    addFeature,
    removeFeature,
    addInclusion,
    removeInclusion,
  };
}
