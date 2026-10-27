import mongoose from 'mongoose';
import { env } from './config/env.js';
import { Project } from './models/Project.js';
import { showcaseProjects } from '../shared/data/showcaseProjects.mjs';

/**
 * Projects database seed script
 * Usage:
 *   node seed.js         (Adds missing illustrative projects without removing existing projects)
 *   node seed.js --reset (Clears all projects, then seeds illustrative projects)
 */

async function runSeed() {
  const isReset = process.argv.includes('--reset');

  try {
    console.log(`[Seed] Connecting to MongoDB: ${env.MONGO_URI}`);
    await mongoose.connect(env.MONGO_URI);
    console.log('[Seed] Database connected.');

    if (isReset) {
      console.log('[Seed] Flag --reset detected. Clearing existing projects...');
      await Project.deleteMany({});
      console.log('[Seed] All projects cleared.');
    }

    const existingTitles = await Project.distinct('title', {
      title: { $in: showcaseProjects.map((project) => project.title) },
    });
    const existingTitleSet = new Set(existingTitles);
    const projectsToInsert = showcaseProjects.filter((project) => !existingTitleSet.has(project.title));

    if (projectsToInsert.length > 0) {
      console.log(`[Seed] Inserting ${projectsToInsert.length} illustrative projects...`);
      await Project.insertMany(projectsToInsert);
      console.log('[Seed] Illustrative projects inserted successfully.');
    } else {
      console.log('[Seed] Illustrative projects already exist. No duplicates inserted.');
    }

    console.log('[Seed] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error during seeding:', err.message);
    process.exit(1);
  }
}

runSeed();
