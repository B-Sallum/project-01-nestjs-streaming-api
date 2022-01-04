-- CreateTable
CREATE TABLE "_MoviesToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MoviesToUsers_AB_unique" ON "_MoviesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviesToUsers_B_index" ON "_MoviesToUsers"("B");

-- AddForeignKey
ALTER TABLE "_MoviesToUsers" ADD FOREIGN KEY ("A") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoviesToUsers" ADD FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
