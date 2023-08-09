-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "JobOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidateToJobOpportunity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToJobOpportunity_AB_unique" ON "_CandidateToJobOpportunity"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToJobOpportunity_B_index" ON "_CandidateToJobOpportunity"("B");

-- AddForeignKey
ALTER TABLE "_CandidateToJobOpportunity" ADD CONSTRAINT "_CandidateToJobOpportunity_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToJobOpportunity" ADD CONSTRAINT "_CandidateToJobOpportunity_B_fkey" FOREIGN KEY ("B") REFERENCES "JobOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
